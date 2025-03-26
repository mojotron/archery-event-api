import { z } from "zod";
import { recordIDSchema } from "./scorecards.schemas";

export const createClubSchema = z.object({
  name: z.string().trim(),
  address: z.string().trim(),
});

export const editClubSchema = z.object({
  clubId: recordIDSchema,
  name: z.string().trim().optional(),
  address: z.string().trim().optional(),
});
