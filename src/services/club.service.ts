import prisma from "../config/prisma.js";
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../constants/http.js";
import appAsserts from "../utils/appAssert.js";

type CreateClubParams = {
  name: string;
  address: string;
};
export const createClub = async ({ name, address }: CreateClubParams) => {
  const club = await prisma.club.create({ data: { name, address } });
  appAsserts(club, INTERNAL_SERVER_ERROR, "failed to create new club");

  return { club };
};

export const getClubs = async () => {
  const clubs = await prisma.club.findMany();

  return { clubs };
};

export const getClub = async (clubId: string) => {
  const club = await prisma.club.findUnique({
    where: { id: clubId },
    include: { tournaments: true },
  });
  appAsserts(club, NOT_FOUND, "club not found");

  return { club };
};

export const deleteClub = async (clubId: string) => {
  const club = await prisma.club.findUnique({
    where: { id: clubId },
    include: { members: { select: { id: true } } },
  });
  appAsserts(club, NOT_FOUND, "club not found");
  console.log("MEMBERS", club.members);

  appAsserts(
    club.members.length === 0,
    CONFLICT,
    "unable to delete club, has members"
  );

  const deletedClub = await prisma.club.delete({ where: { id: club.id } });
  appAsserts(deletedClub, INTERNAL_SERVER_ERROR, "failed to delete club");

  return { club: deletedClub };
};

type EditClubProps = {
  clubId: string;
  name?: string;
  address?: string;
};
export const editClub = async ({ clubId, name, address }: EditClubProps) => {
  const club = await prisma.club.findUnique({ where: { id: clubId } });
  appAsserts(club, NOT_FOUND, "club not found");

  const updatedClub = await prisma.club.update({
    where: { id: clubId },
    data: {
      ...(name !== undefined && { name }),
      ...(address !== undefined && { address }),
    },
  });
  appAsserts(updatedClub, INTERNAL_SERVER_ERROR, "failed to update club");

  return { club: updatedClub };
};
