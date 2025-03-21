import prisma from "../config/prisma.js";
import { INTERNAL_SERVER_ERROR } from "../constants/http.js";
import { StatusFilterType } from "../controllers/season.schema.js";
import appAsserts from "../utils/appAssert.js";

type CreateSeasonScan3DParams = {
  title: string;
  description: string;
  tournamentCount: number;
};
export const createSeasonScan3D = async (data: CreateSeasonScan3DParams) => {
  const season = await prisma.seasonScan3D.create({ data });
  appAsserts(season, INTERNAL_SERVER_ERROR, "failed to create season");
  return { season };
};

type GetSeasonsScan3DParams = {
  statusFilter: StatusFilterType;
};
export const getSeasonsScan3D = async ({
  statusFilter,
}: GetSeasonsScan3DParams) => {
  const seasons = await prisma.seasonScan3D.findMany({
    include: { tournaments: { select: { id: true } } },
  });

  return { seasons };
};
