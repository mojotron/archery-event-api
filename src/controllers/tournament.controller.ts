import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import { OK } from "../constants/http.js";
import {
  createTournamentSchema,
  tournamentIdSchema,
  updateTournamentSchema,
} from "./tournament.schema.js";
import {
  createTournament,
  deleteTournament,
  getTournament,
  updateTournament,
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

    const { tournament } = await getTournament(tournamentId);

    return res
      .status(OK)
      .json({ message: `get single tournament`, tournament });
  }
);

export const deleteTournamentHandler = catchErrors(
  async (req: Request, res: Response) => {
    const tournamentId = tournamentIdSchema.parse(req.params.tournamentId);

    const { tournament } = await deleteTournament(tournamentId, req.userId);

    return res
      .status(OK)
      .json({ message: "tournament deleted successful", tournament });
  }
);

export const updateTournamentHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = updateTournamentSchema.parse({ ...req.body });

    const { tournament } = await updateTournament({
      ...request,
      createdById: req.userId,
    });

    return res
      .status(OK)
      .json({ message: "tournament update successful", tournament });
  }
);
