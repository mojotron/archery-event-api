import { z } from "zod";

export const createSeasonSchema = z.object({
  title: z.string().trim(),
  description: z.string().trim(),
  tournamentCount: z.number(),
});
