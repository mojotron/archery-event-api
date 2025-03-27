import { z } from "zod";
import {
  animalHitSchema,
  databaseIdSchema,
  rulesSchema,
} from "./general.schema";

const score3DSchema = z.object({
  arrow: z.number().min(1).max(3),
  hit: animalHitSchema,
});
const arrowWASchema = z.number().min(1).max(10);

const scoreWAschema = z.object({
  first: arrowWASchema,
  second: arrowWASchema,
  third: arrowWASchema,
  isBullseye: z.boolean(),
});

export const createScoreCardSchema = z.object({
  archerId: databaseIdSchema,
  tournamentId: databaseIdSchema,
  rules: rulesSchema,
  score3DList: z.array(score3DSchema).optional(),
  scoreWAList: z.array(scoreWAschema).optional(),
});
