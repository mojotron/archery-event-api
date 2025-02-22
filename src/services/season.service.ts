import { SeasonType } from "@prisma/client";

type CreateSeasonParma = {
  title: string;
  description: string;
  type: SeasonType;
  tournamentCount: number;
};

export const createSeason = async (data: CreateSeasonParma) => {
  //
};
