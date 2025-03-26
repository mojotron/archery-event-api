import prisma from "../config/prisma.js";
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../constants/http.js";
import appAsserts from "../utils/appAssert.js";

type CreateArcherParams = {
  clubId: string;
  firstName: string;
  lastName: string;
  username: string;
  email?: string;
};
export const createArcher = async (data: CreateArcherParams) => {
  const usernameExists = await prisma.archer.findUnique({
    where: {
      username: data.username,
    },
  });
  appAsserts(!usernameExists, CONFLICT, "username already exists");

  if (data.email) {
    const emailExists = await prisma.archer.findUnique({
      where: { email: data.email },
    });
    appAsserts(!emailExists, CONFLICT, "email already in use");
  }

  const archer = await prisma.archer.create({ data });
  appAsserts(archer, INTERNAL_SERVER_ERROR, "failed to create archer");

  return { archer };
};

type GetArchersParams = {
  clubFilter?: string;
  nameFilter?: string;
};
export const getArcherList = async ({
  clubFilter = undefined,
  nameFilter = undefined,
}: GetArchersParams) => {
  const archers = await prisma.archer.findMany({
    where: {
      ...(clubFilter && { clubId: clubFilter }),
      ...(nameFilter && {
        OR: [
          { firstName: { startsWith: nameFilter } },
          { lastName: { startsWith: nameFilter } },
          { username: { startsWith: nameFilter } },
        ],
      }),
    },
    include: { club: { select: { id: true, name: true } } },
  });
  return { archers };
};

export const getArcher = async (archerId: string) => {
  const archer = await prisma.archer.findUnique({
    where: { id: archerId },
    include: { club: { select: { id: true, name: true } } },
  });
  appAsserts(archer, NOT_FOUND, "archer not found");

  return { archer };
};

export const deleteArcher = async (archerId: string) => {
  const archer = await prisma.archer.findUnique({
    where: { id: archerId },
    include: { _count: { select: { scorecards: true } } },
  });
  appAsserts(archer, NOT_FOUND, "archer not found");
  appAsserts(archer._count.scorecards === 0, CONFLICT, "archer has scorecards");

  const deletedArcher = await prisma.archer.delete({
    where: { id: archer.id },
  });
  appAsserts(deleteArcher, INTERNAL_SERVER_ERROR, "failed to delete archer");

  return { archer: deletedArcher };
};

type EditArcherParams = {
  archerId: string;
  clubId?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  public?: boolean;
};
export const editArcher = async (data: EditArcherParams) => {
  const archer = await prisma.archer.findUnique({
    where: { id: data.archerId },
  });
  appAsserts(archer, NOT_FOUND, "archer not found");
  // try to change username
  if (data.username) {
    const usernameExists = await prisma.archer.findUnique({
      where: { username: data.username },
    });
    appAsserts(!usernameExists, CONFLICT, "username already in use");
  }
  // try to change email
  if (data.email) {
    const emailExists = await prisma.archer.findUnique({
      where: { email: data.email },
    });
    appAsserts(!emailExists, CONFLICT, "email already in use");
  }

  const updatedArcher = await prisma.archer.update({
    where: { id: archer.id },
    data: {
      ...(data.clubId !== undefined && { clubId: data.clubId }),
      ...(data.firstName !== undefined && { firstName: data.firstName }),
      ...(data.lastName !== undefined && { lastName: data.lastName }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.username !== undefined && { username: data.username }),
      ...(data.public !== undefined && { public: data.public }),
    },
    include: { club: { select: { name: true, id: true } } },
  });

  return { archer: updatedArcher };
};
