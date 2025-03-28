import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import {
  createScorecard,
  deleteScorecard,
  getScorecard,
  getScorecardList,
} from "../services/scorecard.service.js";
import {
  createScorecardSchema,
  getScorecardListSchema,
  getScorecardSchema,
} from "./scorecards.schemas.js";
import { databaseIdSchema } from "./general.schema.js";
import { CREATED, OK } from "../constants/http.js";

// CREATE
export const createScorecardHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = createScorecardSchema.parse({ ...req.body });
    const { scorecard } = await createScorecard(request);
    return res.status(CREATED).json(scorecard);
  }
);

// READ
export const getScorecardListHandler = catchErrors(
  async (req: Request, res: Response) => {
    const { rules, tournament, archer } = getScorecardListSchema.parse({
      rules: req.body.rules,
      tournament: req.query.tournament,
      archer: req.query.archer,
    });

    const { scorecards } = await getScorecardList({
      rules,
      tournamentFilter: tournament,
      archerFilter: archer,
    });

    return res.status(OK).json(scorecards);
  }
);

export const getScorecardHandler = catchErrors(
  async (req: Request, res: Response) => {
    const { scorecardId, rules } = getScorecardSchema.parse({ ...req.body });
    const { scorecard } = await getScorecard({ scorecardId, rules });
    return res.status(OK).json(scorecard);
  }
);

// UPDATE
// for now updating scorecard would make more problems then simply deleting and creating new

// DELETE
export const deleteScorecardHandler = catchErrors(
  async (req: Request, res: Response) => {
    const { scorecardId, rules } = getScorecardSchema.parse({ ...req.body });
    const { scorecard } = await deleteScorecard({ scorecardId, rules });
    return res.status(OK).json(scorecard);
  }
);
