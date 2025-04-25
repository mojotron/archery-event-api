import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import { OK } from "../constants/http.js";
import {
  createTournamentSchema,
  filterTournamentSchema,
  updateTournamentSchema,
} from "./tournament.schema.js";
import { databaseIdSchema } from "./general.schema.js";
import {
  createTournament,
  deleteTournament,
  getTournament,
  getTournamentList,
  updateTournament,
} from "../services/tournament.service.js";
import { CREATED } from "../constants/http.js";

// CREATE
export const createTournamentHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = createTournamentSchema.parse({ ...req.body });
    const { tournament } = await createTournament(request);
    return res.status(CREATED).json(tournament);
  }
);

// READ
export const getTournamentListHandler = catchErrors(
  async (req: Request, res: Response) => {
    const { season, club, status, rules } = filterTournamentSchema.parse({
      ...req.query,
    });
    const { tournaments } = await getTournamentList({
      seasonFilter: season,
      clubFilter: club,
      statusFilter: status,
      rulesFilter: rules,
    });
    return res.status(OK).json(tournaments);
  }
);

export const getTournamentHandler = catchErrors(
  async (req: Request, res: Response) => {
    const tournamentId = databaseIdSchema.parse(req.params.tournamentId);
    const { tournament } = await getTournament(tournamentId);
    return res.status(OK).json(tournament);
  }
);

// UPDATE
export const updateTournamentHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = updateTournamentSchema.parse({
      ...req.body,
      tournamentId: req.params.tournamentId,
    });

    const { tournament } = await updateTournament(request);

    return res.status(OK).json(tournament);
  }
);

// DELETE
export const deleteTournamentHandler = catchErrors(
  async (req: Request, res: Response) => {
    const tournamentId = databaseIdSchema.parse(req.params.tournamentId);
    const { tournament } = await deleteTournament(tournamentId);
    return res.status(OK).json(tournament);
  }
);
