import { Season, SeasonType } from "@prisma/client";
import prisma from "../config/prisma.js";
import appAsserts from "../utils/appAssert.js";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../constants/http.js";
import { SeasonFilterType } from "../controllers/season.schema.js";

type CreateSeasonParma = {
  title: string;
  description: string;
  type: SeasonType;
  tournamentCount: number;
  userId: string;
};

export const createSeason = async ({
  title,
  description,
  type,
  tournamentCount,
  userId,
}: CreateSeasonParma) => {
  const newSeason = await prisma.season.create({
    data: {
      title,
      description,
      type,
      tournamentCount,
      userId,
    },
  });
  appAsserts(
    newSeason,
    INTERNAL_SERVER_ERROR,
    "Could not create season, please try again later!"
  );

  return {
    season: newSeason,
  };
};

export const getSeasons = async (filter: SeasonFilterType) => {
  const seasons = await prisma.season.findMany({
    where: {
      ...(filter === "active" && { isFinished: false }),
      ...(filter === "finished" && { isFinished: true }),
    },
    select: { id: true, title: true, isFinished: true },
  });

  return { seasons };
};

export const getSeasonById = async (seasonId: string) => {
  const season = await prisma.season.findUnique({ where: { id: seasonId } });
  appAsserts(season, NOT_FOUND, "season not found");

  return { season };
};

export const deleteSeason = async (seasonId: string) => {
  const season = await prisma.season.delete({ where: { id: seasonId } });
  appAsserts(season, NOT_FOUND, "season not found");

  return { season };
};

export const updateSeason = async () => {};
