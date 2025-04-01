import { RulesType } from "@prisma/client";
import prisma from "../config/prisma.js";
import appAsserts from "../utils/appAssert.js";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../constants/http.js";
import { StatusEnum } from "../controllers/general.schema.js";

// CREATE
type CreateSeasonParams = {
  rules: RulesType;
  title: string;
  description: string;
  tournamentCount: number;
};
export const createSeason = async (data: CreateSeasonParams) => {
  const season = await prisma.season.create({ data });
  appAsserts(season, INTERNAL_SERVER_ERROR, "failed to create new season");

  return { season };
};

// READ
type SeasonListParams = {
  statusFilter?: StatusEnum;
  rulesFilter?: RulesType;
};
export const getSeasonList = async ({
  statusFilter = undefined,
  rulesFilter = undefined,
}: SeasonListParams) => {
  const seasons = await prisma.season.findMany({
    where: {
      ...(statusFilter === "active" && { isFinished: false }),
      ...(statusFilter === "finished" && { isFinished: true }),
      ...(rulesFilter && { rules: rulesFilter }),
    },
    include: { tournaments: { select: { title: true, id: true } } },
  });
  return { seasons };
};

export const getSeason = async (seasonId: string) => {
  const season = await prisma.season.findUnique({
    where: { id: seasonId },
    include: { tournaments: { select: { title: true, id: true } } },
  });
  appAsserts(season, NOT_FOUND, "season not found");

  return { season };
};

// UPDATE
type UpdateSeasonParams = {
  seasonId: string;
  rules?: RulesType;
  title?: string;
  description?: string;
  tournamentCount?: number;
  isFinished?: boolean;
};
export const updateSeason = async (data: UpdateSeasonParams) => {
  const season = await prisma.season.findUnique({
    where: { id: data.seasonId },
  });
  appAsserts(season, NOT_FOUND, "season not found");

  const updatedSeason = await prisma.season.update({
    where: { id: season.id },
    data: {
      ...(data.rules && { rules: data.rules }),
      ...(data.title && { title: data.title }),
      ...(data.description && { description: data.description }),
      ...(data.tournamentCount && { tournamentCount: data.tournamentCount }),
      ...(data.isFinished && { isFinished: data.isFinished }),
    },
  });
  appAsserts(updatedSeason, INTERNAL_SERVER_ERROR, "failed to update season");

  return { season: updatedSeason };
};

// DELETE
export const deleteSeason = async (seasonId: string) => {
  const season = await prisma.season.findUnique({
    where: { id: seasonId },
    include: { _count: { select: { tournaments: true } } },
  });
  appAsserts(season, NOT_FOUND, "season not found");
  appAsserts(
    season._count.tournaments === 0,
    BAD_REQUEST,
    "can't delete season with tournaments"
  );

  const deletedSeason = await prisma.season.delete({
    where: { id: season.id },
  });
  appAsserts(deletedSeason, INTERNAL_SERVER_ERROR, "failed to delete season");

  return { season: deletedSeason };
};
