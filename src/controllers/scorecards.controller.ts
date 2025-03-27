import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import { createScoreCard } from "../services/scorecard.service.js";
import { createScoreCardSchema } from "./scorecards.schemas.js";
import { databaseIdSchema } from "./general.schema.js";
import { CREATED, OK } from "../constants/http.js";

export const createScoreCardHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = createScoreCardSchema.parse({ ...req.body });
    const { scoreCard } = await createScoreCard(request);
    return res.status(CREATED).json(scoreCard);
  }
);
