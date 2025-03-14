import { z } from "zod";

export const archerIdSchema = z.string().trim().length(36);

export const createArcherSchema = z.object({
  clubId: z.string().trim().length(36),
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  email: z.string().email().trim().optional(),
  username: z
    .string()
    .trim()
    .refine((data) => data.match(/^[A-Za-z0-9\-\_]+$/), {
      message: `username accepts letters, numbers dash and underscore (no space)`,
      path: ["username"],
    }),
});
