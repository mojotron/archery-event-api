import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import {
  createSeasonSchema,
  seasonFilterSchema,
  updateSeasonSchema,
} from "./season.schema.js";
import {
  createSeason,
  getSeason,
  deleteSeason,
  getSeasonList,
  updateSeason,
} from "../services/season.service.js";
import { CREATED, OK } from "../constants/http.js";
import { databaseIdSchema } from "./general.schema.js";

// CREATE
export const createSeasonHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = createSeasonSchema.parse({ ...req.body });
    const { season } = await createSeason(request);
    return res.status(CREATED).json(season);
  }
);
// READ
export const getSeasonListHandler = catchErrors(
  async (req: Request, res: Response) => {
    const { rules, status } = seasonFilterSchema.parse({ ...req.query });
    const { seasons } = await getSeasonList({
      rulesFilter: rules,
      statusFilter: status,
    });
    return res.status(OK).json(seasons);
  }
);

export const getSeasonHandler = catchErrors(
  async (req: Request, res: Response) => {
    const seasonId = databaseIdSchema.parse(req.params.seasonId);
    const { season } = await getSeason(seasonId);
    return res.status(OK).json(season);
  }
);
// UPDATE
export const updateSeasonHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = updateSeasonSchema.parse({
      ...req.body,
      seasonId: req.params.seasonId,
    });
    const { season } = await updateSeason(request);
    return res.status(OK).json(season);
  }
);
// DELETE
export const deleteSeasonHandler = catchErrors(
  async (req: Request, res: Response) => {
    const seasonId = databaseIdSchema.parse(req.params.seasonId);
    const { season } = await deleteSeason(seasonId);
    return res.status(OK).json(season);
  }
);
