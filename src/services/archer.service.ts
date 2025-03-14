import prisma from "../config/prisma.js";
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../constants/http.js";
import appAsserts from "../utils/appAssert.js";

type CreateArcherParams = {
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

export const getArcherList = async () => {
  const archers = await prisma.archer.findMany();
  return { archers };
};

export const getArcher = async (archerId: string) => {
  const archer = await prisma.archer.findUnique({ where: { id: archerId } });
  appAsserts(archer, NOT_FOUND, "archer not found");

  return { archer };
};

export const deleteArcher = async (archerId: string) => {
  const archer = await prisma.archer.findUnique({
    where: { id: archerId },
    include: {
      scorecardsScan3D: { select: { id: true } },
      scorecardsWA: { select: { id: true } },
    },
  });
  appAsserts(archer, NOT_FOUND, "archer not found");
  appAsserts(
    archer.scorecardsScan3D.length === 0 || archer.scorecardsWA.length === 0,
    CONFLICT,
    "archer has scorecards"
  );

  const deletedArcher = await prisma.archer.delete({
    where: { id: archer.id },
  });
  appAsserts(deleteArcher, INTERNAL_SERVER_ERROR, "failed to delete archer");

  return { archer: deletedArcher };
};
