import { z } from "zod";

export const sessionSchema = z.string().length(36).trim();
