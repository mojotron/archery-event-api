import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import {
  createScandinavian3DScoreCard,
  listS3DScorecards,
} from "../services/scorecard.service.js";
import {
  recordIDSchema,
  scandinavian3DScorecardSchema,
} from "./scorecards.schemas.js";
import { CREATED, OK } from "../constants/http.js";

export const addScandinavian3DScorecardHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = scandinavian3DScorecardSchema.parse({ ...req.body });

    const { scorecard } = await createScandinavian3DScoreCard(request);

    return res
      .status(CREATED)
      .json({ message: "scandinavian 3D score card created", scorecard });
  }
);

export const getS3DTournamentScorecards = catchErrors(
  async (req: Request, res: Response) => {
    const tournamentId = recordIDSchema.parse(req.params.tournamentId);

    const { scorecards } = await listS3DScorecards(tournamentId);

    return res
      .status(OK)
      .json({ message: "get tournament scorecard list", scorecards });
  }
);
