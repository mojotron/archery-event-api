import prisma from "../config/prisma.js";
import { CONFLICT, INTERNAL_SERVER_ERROR } from "../constants/http";
import appAsserts from "../utils/appAssert";

type CreateArcherParams = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
};
export const createArcher = async (data: CreateArcherParams) => {
  const archer = await prisma.archer.create({ data });
  appAsserts(archer, INTERNAL_SERVER_ERROR, "failed to create archer");

  return { archer };
};

export const getArcherList = async () => {
  const archers = await prisma.archer.findMany();
  return { archers };
};
