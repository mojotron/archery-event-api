import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import {
  archerFilterSchema,
  createArcherSchema,
  updateArchersSchema,
} from "./archer.schema.js";
import { recordIDSchema } from "./scorecards.schemas.js";
import {
  createArcher,
  deleteArcher,
  editArcher,
  getArcher,
  getArcherList,
} from "../services/archer.service.js";
import { CREATED, OK } from "../constants/http.js";

// CREATE
export const createArcherHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = createArcherSchema.parse({ ...req.body });
    const { archer } = await createArcher(request);
    return res.status(CREATED).json(archer);
  }
);
// READ
export const getArcherListHandler = catchErrors(
  async (req: Request, res: Response) => {
    const { club, name } = archerFilterSchema.parse({ ...req.query });
    const { archers } = await getArcherList({
      clubFilter: club,
      nameFilter: name,
    });
    return res.status(OK).json(archers);
  }
);

export const getArcherHandler = catchErrors(
  async (req: Request, res: Response) => {
    const archerId = recordIDSchema.parse(req.params.archerId);
    const { archer } = await getArcher(archerId);
    return res.status(OK).json(archer);
  }
);
// UPDATE
export const updateArcherHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = updateArchersSchema.parse({
      ...req.body,
      archerId: req.params.archerId,
    });
    const { archer } = await editArcher(request);
    return res.status(OK).json(archer);
  }
);
// DELETE
export const deleteArcherHandler = catchErrors(
  async (req: Request, res: Response) => {
    const archerId = recordIDSchema.parse(req.params.archerId);
    const { archer } = await deleteArcher(archerId);
    return res.status(OK).json(archer);
  }
);
