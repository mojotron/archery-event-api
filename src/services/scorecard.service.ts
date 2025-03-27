import { AnimalHit, RulesType } from "@prisma/client";
import prisma from "../config/prisma";
import appAsserts from "../utils/appAssert";
import { INTERNAL_SERVER_ERROR } from "../constants/http";

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

type CreateScoreCardParams = {
  archerId: string;
  tournamentId: string;
  rules: RulesType;
  score3DList?: Score3D[];
  scoreWAList?: ScoreWA[];
};

export const createScoreCard = async ({
  archerId,
  tournamentId,
  rules,
  score3DList = undefined,
  scoreWAList = undefined,
}: CreateScoreCardParams) => {
  const scoreCard = await prisma.scoreCard.create({
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
  appAsserts(scoreCard, INTERNAL_SERVER_ERROR, "failed to create scorecard");

  return { scoreCard };
};
