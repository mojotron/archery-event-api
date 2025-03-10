import { ScoreScandinavian3DHit } from "@prisma/client";
import prisma from "../config/prisma";
import appAsserts from "../utils/appAssert";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../constants/http";
type S3DTarget = {
  arrow: number;
  hit: ScoreScandinavian3DHit;
};
type CreateS3DScorecardParams = {
  userId: string;
  tournamentId: string;
  targets: S3DTarget[];
};

export const createScandinavian3DScoreCard = async ({
  userId,
  tournamentId,
  targets,
}: CreateS3DScorecardParams) => {
  const scorecard = await prisma.scoreCardScandinavian3D.create({
    data: {
      userId,
      tournamentId,
      targets: {
        create: targets,
      },
    },
  });
  appAsserts(scorecard, INTERNAL_SERVER_ERROR, "failed to create scorecard");

  return { scorecard };
};

export const listS3DScorecards = async (tournamentId: string) => {
  const scorecards = await prisma.scoreCardScandinavian3D.findMany({
    where: { tournamentId },
    include: { targets: true },
  });
  appAsserts(scorecards, NOT_FOUND, "scorecards not found");

  return { scorecards };
};
