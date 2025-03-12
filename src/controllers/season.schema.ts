// import { SeasonType } from "@prisma/client";
import { boolean, z } from "zod";

export const seasonFilterSchema = z
  .union([z.literal("all"), z.literal("active"), z.literal("finished")])
  .optional();

export type SeasonFilterType = z.infer<typeof seasonFilterSchema>;

export const seasonSchema = z.object({
  title: z.string().trim(),
  description: z.string().trim(),
  tournamentCount: z.number(),
  // type: z.nativeEnum(SeasonType),
});

export const seasonIdSchema = z.string().length(36);

export const updateSeasonSchema = z.object({
  title: z.string().trim().optional(),
  description: z.string().trim().optional(),
  tournamentCount: z.number().optional(),
  isFinished: z.boolean().optional(),
  seasonId: seasonIdSchema,
});
