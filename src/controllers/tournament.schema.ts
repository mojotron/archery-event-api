import { z } from "zod";
import { StatusEnum, databaseIdSchema, rulesSchema } from "./general.schema.js";

export const createTournamentSchema = z.object({
  seasonId: databaseIdSchema.optional(),
  organizedById: databaseIdSchema.optional(),
  rules: rulesSchema,
  title: z.string().trim(),
  description: z.string().trim(),
  attendAt: z.string().trim().datetime(),
  address: z.string().trim(),
});

export const filterTournamentSchema = z.object({
  season: databaseIdSchema.optional(),
  club: databaseIdSchema.optional(),
  status: z.nativeEnum(StatusEnum).optional(),
});

export const updateTournamentSchema = z.object({
  tournamentId: databaseIdSchema,
  seasonId: databaseIdSchema.optional(),
  organizedById: databaseIdSchema.optional(),
  rules: rulesSchema.optional(),
  title: z.string().trim().optional(),
  description: z.string().trim().optional(),
  attendAt: z.string().trim().datetime().optional(),
  address: z.string().trim().optional(),
  isFinished: z.boolean().optional(),
});
