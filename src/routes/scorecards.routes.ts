import { Router } from "express";
import isAdmin from "../middlewares/isAdmin.js";
import {
  addScandinavian3DScorecardHandler,
  getS3DTournamentScorecards,
} from "../controllers/scorecards.controller.js";

const scorecardRoutes = Router();

scorecardRoutes.get(
  "/scandinavian3D/:tournamentId",
  getS3DTournamentScorecards
);
scorecardRoutes.post(
  "/add-score-card/scandinavian3D",
  isAdmin,
  addScandinavian3DScorecardHandler
);

export default scorecardRoutes;
