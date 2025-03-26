import { RulesType } from "@prisma/client";
import { z } from "zod";

export const databaseIdSchema = z.string().length(36);
export const rulesSchema = z.nativeEnum(RulesType);
export enum StatusEnum {
  active = "active",
  finished = "finished",
}
