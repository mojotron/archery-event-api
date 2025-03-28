import { AnimalHit, RulesType } from "@prisma/client";
import prisma from "../config/prisma.js";
import appAsserts from "../utils/appAssert.js";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../constants/http.js";

// CREATE
type Score3D = {
  arrow: number;
  hit: AnimalHit;
};

type ScoreWA = {
  first: number;
  second: number;
  third: number;
  isBullseye: boolean;
};

type CreateScorecardParams = {
  archerId: string;
  tournamentId: string;
  rules: RulesType;
  score3DList?: Score3D[];
  scoreWAList?: ScoreWA[];
};

export const createScorecard = async ({
  archerId,
  tournamentId,
  rules,
  score3DList = undefined,
  scoreWAList = undefined,
}: CreateScorecardParams) => {
  const scorecard = await prisma.scorecard.create({
    data: {
      tournamentId,
      archerId,
      rules,
      ...(rules === RulesType.scandinavian3D &&
        score3DList !== undefined && {
          scores3D: {
            createMany: {
              data: score3DList,
            },
          },
        }),
      ...(rules === RulesType.worldArchery &&
        scoreWAList !== undefined && {
          scoresWA: { createMany: { data: scoreWAList } },
        }),
    },
  });
  appAsserts(scorecard, INTERNAL_SERVER_ERROR, "failed to create scorecard");

  return { scorecard };
};

// READ
type GetScorecardsParams = {
  rules: RulesType;
  tournamentFilter?: string;
  archerFilter?: string;
};
export const getScorecardList = async ({
  rules,
  tournamentFilter = undefined,
  archerFilter = undefined,
}: GetScorecardsParams) => {
  const scorecards = await prisma.scorecard.findMany({
    where: {
      ...(tournamentFilter && { tournamentId: tournamentFilter }),
      ...(archerFilter && { archerId: archerFilter }),
    },
    include: {
      ...(rules === RulesType.scandinavian3D && {
        scores3D: { select: { arrow: true, hit: true, id: true } },
      }),
      ...(rules === RulesType.worldArchery && {
        scoresWA: {
          select: {
            first: true,
            second: true,
            third: true,
            isBullseye: true,
            id: true,
          },
        },
      }),
    },
  });
  return { scorecards };
};

type ScorecardParams = {
  scorecardId: string;
  rules: RulesType;
};
// rules are for dynamic selecting right score list
export const getScorecard = async ({ scorecardId, rules }: ScorecardParams) => {
  const scorecard = await prisma.scorecard.findUnique({
    where: { id: scorecardId },
    include: {
      ...(rules === RulesType.scandinavian3D && {
        scores3D: { select: { arrow: true, hit: true, id: true } },
      }),
      ...(rules === RulesType.worldArchery && {
        scoresWA: {
          select: {
            first: true,
            second: true,
            third: true,
            isBullseye: true,
            id: true,
          },
        },
      }),
    },
  });
  appAsserts(scorecard, NOT_FOUND, "scorecard not found");
  return { scorecard };
};

export const deleteScorecard = async ({
  rules,
  scorecardId,
}: ScorecardParams) => {
  const scorecard = await prisma.scorecard.findUnique({
    where: { id: scorecardId },
  });
  appAsserts(!scorecard, NOT_FOUND, "scorecard not found");

  // delete all scores before deleting score
  if (rules === RulesType.scandinavian3D) {
    await prisma.score3D.deleteMany({ where: { scorecardId: scorecardId } });
  }
  if (rules === RulesType.worldArchery) {
    await prisma.scoreWA.deleteMany({ where: { scorecardId: scorecardId } });
  }

  const deletedScorecard = await prisma.scorecard.delete({
    where: { id: scorecardId },
  });
  appAsserts(
    deletedScorecard,
    INTERNAL_SERVER_ERROR,
    "failed to delete scorecard"
  );

  return { scorecard: deletedScorecard };
};
