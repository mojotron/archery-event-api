import { Router } from "express";
import isAdmin from "../middlewares/isAdmin.js";
import { createTournamentHandler } from "../controllers/tournament.controller";

const tournamentRoutes = Router();

tournamentRoutes.post("/", isAdmin, createTournamentHandler);

export default tournamentRoutes;
