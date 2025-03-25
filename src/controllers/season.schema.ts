import { z } from "zod";
import { RulesType } from "@prisma/client";
import { recordIDSchema } from "./scorecards.schemas";

const rulesSchema = z.nativeEnum(RulesType);

export enum StatusEnum {
  active = "active",
  finished = "finished",
}

export const seasonFilterSchema = z.object({
  rules: rulesSchema.optional(),
  status: z.nativeEnum(StatusEnum).optional(),
});

export const createSeasonSchema = z.object({
  title: z.string().trim(),
  rules: rulesSchema,
  description: z.string().trim(),
  tournamentCount: z.number(),
});

export const updateSeasonSchema = z.object({
  seasonId: recordIDSchema,
  title: z.string().trim().optional(),
  rules: rulesSchema.optional(),
  description: z.string().trim().optional(),
  tournamentCount: z.number().optional(),
  isFinished: z.boolean().optional(),
});
