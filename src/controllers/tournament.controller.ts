import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import { OK } from "../constants/http.js";
import {
  createTournamentSchema,
  tournamentIdSchema,
} from "./tournament.schema.js";
import {
  createTournament,
  getTournament,
} from "../services/tournament.service.js";
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

export const getSingleTournamentHandler = catchErrors(
  async (req: Request, res: Response) => {
    const tournamentId = tournamentIdSchema.parse(req.params.tournamentId);

    await getTournament(tournamentId);

    return res.status(OK).json({ message: `get single tournament` });
  }
);
