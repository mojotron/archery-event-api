import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import { createSeasonWASchema } from "./season.schema.js";
import { createSeasonWA } from "../services/seasonWA.service.js";
import { CREATED } from "../constants/http.js";

export const createSeasonWAHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = createSeasonWASchema.parse({ ...req.body });
    const { season } = await createSeasonWA(request);
    return res.status(CREATED).json(season);
  }
);
