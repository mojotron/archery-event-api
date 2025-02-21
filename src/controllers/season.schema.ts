import { SeasonType } from "@prisma/client";
import { z } from "zod";

const seasonTypeX = typeof SeasonType;

export const createSeasonSchema = z.object({
  title: z.string().trim(),
  description: z.string().trim(),
  tournamentCount: z.number(),
  //seasonType: z.enum(seasonTypeX),
});
