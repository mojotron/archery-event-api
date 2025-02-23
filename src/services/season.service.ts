import { SeasonType } from "@prisma/client";
import prisma from "../config/prisma.js";
import appAsserts from "../utils/appAssert.js";
import { INTERNAL_SERVER_ERROR } from "../constants/http.js";

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
