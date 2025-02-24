import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import {
  seasonFilterSchema,
  seasonIdSchema,
  seasonSchema,
} from "./season.schema.js";
import { OK } from "../constants/http.js";
import {
  createSeason,
  getSeasons,
  getSeasonById,
} from "../services/season.service.js";

// READ SEASONS
export const getSeasonsHandler = catchErrors(
  async (req: Request, res: Response) => {
    const filter = seasonFilterSchema.parse(req.query.seasonFilter);

    const { seasons } = await getSeasons(filter || "all");

    return res
      .status(OK)
      .json({ message: `list of ${filter} seasons`, seasons });
  }
);

export const getSingleSeasonHandler = catchErrors(
  async (req: Request, res: Response) => {
    const seasonId = seasonIdSchema.parse(req.params.seasonId);

    const { season } = await getSeasonById(seasonId);

    return res.status(OK).json({ message: `get single season`, season });
  }
);
// CREATE SEASON
export const createSeasonHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = seasonSchema.parse({ ...req.body });

    const { season } = await createSeason({ ...request, userId: req.userId });

    return res
      .status(OK)
      .json({ message: `${season.title} season created`, season });
  }
);
// DELETE
export const deleteSeasonHandler = catchErrors(
  async (req: Request, res: Response) => {}
);
// UPDATE
export const updateSeasonHandler = catchErrors(
  async (req: Request, res: Response) => {}
);
