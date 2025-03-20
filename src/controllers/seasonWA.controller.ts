import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import { createSeasonWASchema } from "./season.schema.js";

export const createSeasonWAHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = createSeasonWASchema.parse({ ...req.body });
  }
);
