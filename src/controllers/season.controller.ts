import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import { createSeasonSchema } from "./season.schema.js";
import { OK } from "../constants/http.js";
import { createSeason } from "../services/season.service.js";

export const createSeasonHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = createSeasonSchema.parse({ ...req.body });

    await createSeason();

    return res.status(OK);
  }
);
