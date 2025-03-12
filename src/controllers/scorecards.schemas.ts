import { z } from "zod";
// import { ScoreScandinavian3DHit } from "@prisma/client";

export const recordIDSchema = z.string().trim().length(36);

export const scandinavian3DTargetSchema = z.object({
  arrow: z.number(),
  // hit: z.nativeEnum(ScoreScandinavian3DHit),
});

export const scandinavian3DScorecardSchema = z.object({
  userId: recordIDSchema,
  tournamentId: recordIDSchema,
  targets: z.array(scandinavian3DTargetSchema).length(28),
});
