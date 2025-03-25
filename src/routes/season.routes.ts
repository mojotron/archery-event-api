import { Router } from "express";
import {
  createSeasonHandler,
  getSeasonHandler,
  getSeasonListHandler,
  updateSeasonHandler,
} from "../controllers/season.controller";
import authenticate from "../middlewares/authenticate";

const seasonRoutes = Router();

seasonRoutes.post("/", authenticate, createSeasonHandler);
seasonRoutes.get("/", getSeasonListHandler);
seasonRoutes.get("/:seasonId", getSeasonHandler);
seasonRoutes.delete("/:seasonId", authenticate, getSeasonHandler);
seasonRoutes.patch("/:seasonId", authenticate, updateSeasonHandler);

export default seasonRoutes;
