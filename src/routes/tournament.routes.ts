import { Router } from "express";
import {
  createTournamentHandler,
  getTournamentListHandler,
  getTournamentHandler,
  deleteTournamentHandler,
  updateTournamentHandler,
} from "../controllers/tournament.controller.js";
import authenticate from "../middlewares/authenticate.js";

const tournamentRoutes = Router();

tournamentRoutes.post("/", authenticate, createTournamentHandler);
tournamentRoutes.get("/", getTournamentListHandler);
tournamentRoutes.get("/:tournamentId", getTournamentHandler);
tournamentRoutes.delete(
  "/:tournamentId",
  authenticate,
  deleteTournamentHandler
);
tournamentRoutes.patch("/:tournamentId", authenticate, updateTournamentHandler);

export default tournamentRoutes;
