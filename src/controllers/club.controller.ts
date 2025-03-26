import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import { createClubSchema, editClubSchema } from "./club.schema.js";
import { recordIDSchema } from "./scorecards.schemas.js";
import {
  createClub,
  deleteClub,
  editClub,
  getClub,
  getClubs,
} from "../services/club.service.js";
import { CREATED, OK } from "../constants/http.js";

// CREATE
export const createClubHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = createClubSchema.parse({ ...req.body });

    const { club } = await createClub(request);

    return res.status(CREATED).json(club);
  }
);
// READ
export const getClubListHandler = catchErrors(
  async (req: Request, res: Response) => {
    const { clubs } = await getClubs();
    return res.status(OK).json(clubs);
  }
);

export const getClubHandler = catchErrors(
  async (req: Request, res: Response) => {
    const clubId = recordIDSchema.parse(req.params.clubId);
    const { club } = await getClub(clubId);
    return res.status(OK).json(club);
  }
);
// UPDATE
export const updateClubHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = editClubSchema.parse({
      ...req.body,
      clubId: req.params.clubId,
    });
    const { club } = await editClub(request);
    return res.status(OK).json(club);
  }
);
// DELETE
export const deleteClubHandler = catchErrors(
  async (req: Request, res: Response) => {
    const clubId = recordIDSchema.parse(req.params.clubId);
    const { club } = await deleteClub(clubId);
    return res.status(OK).json(club);
  }
);
