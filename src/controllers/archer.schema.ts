import { z } from "zod";
import { databaseIdSchema } from "./general.schema";

const usernameSchema = z
  .string()
  .trim()
  .refine((data) => data.match(/^[A-Za-z0-9\-\_]+$/), {
    message: `username accepts letters, numbers dash and underscore (no space)`,
    path: ["username"],
  });

export const archerFilterSchema = z.object({
  club: databaseIdSchema.optional(),
  name: z.string().trim().optional(),
});

export const createArcherSchema = z.object({
  clubId: databaseIdSchema,
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  email: z.string().email().trim().optional(),
  username: usernameSchema,
});

export const updateArchersSchema = z.object({
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  email: z.string().email().trim().optional(),
  username: usernameSchema.optional(),
  public: z.boolean().optional(),
  clubId: databaseIdSchema.optional(),
  archerId: databaseIdSchema,
});
