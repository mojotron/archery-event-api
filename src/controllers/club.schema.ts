import { z } from "zod";
import { databaseIdSchema } from "./general.schema";

export const createClubSchema = z.object({
  name: z.string().trim(),
  address: z.string().trim(),
});

export const editClubSchema = z.object({
  clubId: databaseIdSchema,
  name: z.string().trim().optional(),
  address: z.string().trim().optional(),
});
