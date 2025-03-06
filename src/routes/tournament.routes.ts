import { Router } from "express";
import isAdmin from "../middlewares/isAdmin.js";
import {
  createTournamentHandler,
  getSingleTournamentHandler,
  deleteTournamentHandler,
  updateTournamentHandler,
} from "../controllers/tournament.controller.js";

const tournamentRoutes = Router();

tournamentRoutes.post("/", isAdmin, createTournamentHandler);
tournamentRoutes.get("/:tournamentId", getSingleTournamentHandler);
tournamentRoutes.delete("/:tournamentId", isAdmin, deleteTournamentHandler);
tournamentRoutes.patch("/:tournamentId", isAdmin, updateTournamentHandler);

export default tournamentRoutes;
