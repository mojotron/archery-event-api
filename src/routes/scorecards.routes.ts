import { Router } from "express";
import {
  createScorecardHandler,
  getScorecardListHandler,
  getScorecardHandler,
  deleteScorecardHandler,
} from "../controllers/scorecards.controller.js";
import authenticate from "../middlewares/authenticate.js";

const scorecardRoutes = Router();

scorecardRoutes.post("/", authenticate, createScorecardHandler);
scorecardRoutes.get("/", getScorecardListHandler);
scorecardRoutes.get("/:scorecardId", getScorecardHandler);
scorecardRoutes.delete("/:scorecardId", authenticate, deleteScorecardHandler);

export default scorecardRoutes;
