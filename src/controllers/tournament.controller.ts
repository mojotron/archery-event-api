import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import { createTournamentSchema } from "./tournament.schema.js";
import { createTournament } from "../services/tournament.service.js";
import { CREATED } from "../constants/http.js";

export const createTournamentHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = createTournamentSchema.parse({ ...req.body });

    const { tournament } = await createTournament({
      ...request,
      createdById: req.userId,
    });

    return res
      .status(CREATED)
      .json({ message: "new tournament created", tournament });
  }
);
