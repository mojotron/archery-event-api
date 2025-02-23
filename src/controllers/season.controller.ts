import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import { createSeasonSchema } from "./season.schema.js";
import { OK } from "../constants/http.js";
import { createSeason } from "../services/season.service.js";

export const createSeasonHandler = catchErrors(
  async (req: Request, res: Response) => {
    console.log(req.body);

    const request = createSeasonSchema.parse({ ...req.body });

    const { season } = await createSeason({ ...request, userId: req.userId });

    return res
      .status(OK)
      .json({ message: `${season.title} season created`, season });
  }
);
