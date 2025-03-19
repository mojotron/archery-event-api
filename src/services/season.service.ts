import prisma from "../config/prisma.js";
import { INTERNAL_SERVER_ERROR } from "../constants/http";
import appAsserts from "../utils/appAssert";

type CreateSeasonParams = {
  title: string;
  description: string;
  tournamentCount: number;
};

export const createSeasonScan3D = async (data: CreateSeasonParams) => {
  const season = await prisma.seasonScan3D.create({ data: { ...data } });
  appAsserts(season, INTERNAL_SERVER_ERROR, "failed to create season");
  return { season };
};
