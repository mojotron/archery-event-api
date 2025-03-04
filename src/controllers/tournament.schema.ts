import { z } from "zod";

export const tournamentIdSchema = z.string().trim().length(36);

export const createTournamentSchema = z.object({
  seasonId: z.string().trim().length(36),
  attendAt: z.string().trim().datetime(),
  title: z.string().trim(),
  description: z.string().trim().optional(),
  location: z.string().trim(),
  organizedBy: z.string().trim(),
});
