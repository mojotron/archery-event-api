import { z } from "zod";

export const databaseIdSchema = z.string().length(36);
