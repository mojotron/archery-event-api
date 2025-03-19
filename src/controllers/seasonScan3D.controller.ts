import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import {
  createSeasonScan3DSchema,
  seasonFilterSchema,
  seasonIdSchema,
  updateSeasonSchema,
} from "./seasonScan3D.schema.js";
import { OK, CREATED } from "../constants/http.js";
import { createSeasonScan3D } from "../services/season.service.js";

// CREATE
export const createSeasonScan3DHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = createSeasonScan3DSchema.parse({ ...req.body });
    const { season } = await createSeasonScan3D(request);
    return res.status(CREATED).json(season);
  }
);
// READ
export const getSeasonsScan3DHandler = catchErrors(
  async (req: Request, res: Response) => {}
);
export const getSeasonScan3DHandler = catchErrors(
  async (req: Request, res: Response) => {}
);
// UPDATE
export const updateSeasonsScan3DHandler = catchErrors(
  async (req: Request, res: Response) => {}
);
// DELETE
export const deleteSeasonsScan3DHandler = catchErrors(
  async (req: Request, res: Response) => {}
);
