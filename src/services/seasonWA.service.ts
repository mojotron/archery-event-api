import prisma from "../config/prisma.js";
import { INTERNAL_SERVER_ERROR } from "../constants/http.js";
import { StatusFilterType } from "../controllers/season.schema.js";
import appAsserts from "../utils/appAssert.js";

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

type GetSeasonsWAParams = {
  statusFilter: StatusFilterType;
};
export const getSeasonsWA = async ({ statusFilter }: GetSeasonsWAParams) => {
  const seasons = await prisma.seasonWA.findMany({
    where: {
      ...(statusFilter !== undefined && {
        isFinished: statusFilter === "finished",
      }),
    },
    include: { tournaments: { select: { id: true } } },
  });
  return { seasons };
};
