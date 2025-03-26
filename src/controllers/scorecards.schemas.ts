import { z } from "zod";
import { databaseIdSchema } from "./general.schema";

export const scandinavian3DTargetSchema = z.object({
  arrow: z.number(),
  // hit: z.nativeEnum(ScoreScandinavian3DHit),
});

export const scandinavian3DScorecardSchema = z.object({
  userId: databaseIdSchema,
  tournamentId: databaseIdSchema,
  targets: z.array(scandinavian3DTargetSchema).length(28),
});
