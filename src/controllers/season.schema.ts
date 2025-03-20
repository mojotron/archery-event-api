import { z } from "zod";

export const createSeasonScan3DSchema = z.object({
  title: z.string().trim(),
  description: z.string().trim(),
  tournamentCount: z.number(),
});

export const statusFilterSchema = z
  .union([z.literal("active"), z.literal("finished")])
  .optional();

export type StatusFilterType = z.infer<typeof statusFilterSchema>;

export const seasonIdSchema = z.string().length(36);

export const updateSeasonSchema = z.object({
  title: z.string().trim().optional(),
  description: z.string().trim().optional(),
  tournamentCount: z.number().optional(),
  isFinished: z.boolean().optional(),
  seasonId: seasonIdSchema,
});
// WA Target
export const createSeasonWASchema = createSeasonScan3DSchema.extend({
  distance: z.number(),
});
