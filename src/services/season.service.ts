import prisma from "../config/prisma.js";
import { INTERNAL_SERVER_ERROR } from "../constants/http";
import { StatusFilterType } from "../controllers/season.schema.js";
import appAsserts from "../utils/appAssert";

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
    where: {
      ...(statusFilter !== undefined && {
        isFinished: statusFilter === "finished",
      }),
    },
    include: { tournaments: { select: { id: true } } },
  });

  return { seasons };
};
// WATarget
type CreateSeasonWATargetParams = {
  title: string;
  description: string;
  tournamentCount: number;
  distance: number;
};
export const createSeasonWA = async (data: CreateSeasonWATargetParams) => {
  const season = await prisma.seasonWA.create({ data });
  appAsserts(season, INTERNAL_SERVER_ERROR, "failed to create season");
  return { season };
};
