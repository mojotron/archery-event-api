import { Router } from "express";
import { createScoreCardHandler } from "../controllers/scorecards.controller.js";

const scorecardRoutes = Router();

scorecardRoutes.post("/", createScoreCardHandler);

export default scorecardRoutes;
