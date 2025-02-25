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
      createdById: userId,
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

export const deleteSeason = async (seasonId: string, userId: string) => {
  const season = await prisma.season.findUnique({
    where: { id: seasonId, createdById: userId },
  });
  appAsserts(season, NOT_FOUND, "season not found");

  const deletedSeason = await prisma.season.delete({
    where: { id: season.id },
  });
  appAsserts(
    deleteSeason,
    INTERNAL_SERVER_ERROR,
    "deleting season failed, please try again later"
  );
  return { season: deletedSeason };
};

type UpdateSeasonParams = {
  seasonId: string;
  userId: string;
  title?: string;
  description?: string;
  tournamentCount?: number;
  isFinished?: boolean;
};

export const updateSeason = async ({
  seasonId,
  userId,
  title,
  description,
  tournamentCount,
  isFinished,
}: UpdateSeasonParams) => {
  const season = await prisma.season.findUnique({
    where: { id: seasonId, createdById: userId },
  });
  appAsserts(season, NOT_FOUND, "season not found");
  const updatedSeason = await prisma.season.update({
    where: { id: season.id },
    data: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(tournamentCount !== undefined && { tournamentCount }),
      ...(isFinished !== undefined && { isFinished }),
    },
  });
  appAsserts(
    updatedSeason,
    INTERNAL_SERVER_ERROR,
    "updating season failed, please try again later"
  );
  return {
    season: updatedSeason,
  };
};
