import { z } from "zod";

export const createClubSchema = z.object({
  name: z.string().trim(),
  address: z.string().trim(),
});

export const clubIdSchema = z.string().trim().length(36);

export const editClubSchema = z.object({
  clubId: clubIdSchema,
  name: z.string().trim().optional(),
  address: z.string().trim().optional(),
});
