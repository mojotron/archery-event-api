import { Router } from "express";
import isAdmin from "../middlewares/isAdmin.js";
import {
  createTournamentHandler,
  getSingleTournamentHandler,
} from "../controllers/tournament.controller.js";

const tournamentRoutes = Router();

tournamentRoutes.post("/", isAdmin, createTournamentHandler);
tournamentRoutes.get("/:tournamentId", getSingleTournamentHandler);

export default tournamentRoutes;
