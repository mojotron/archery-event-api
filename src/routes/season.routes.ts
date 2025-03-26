import { Router } from "express";
import {
  createSeasonHandler,
  deleteSeasonHandler,
  getSeasonHandler,
  getSeasonListHandler,
  updateSeasonHandler,
} from "../controllers/season.controller";
import authenticate from "../middlewares/authenticate";

const seasonRoutes = Router();

seasonRoutes.post("/", authenticate, createSeasonHandler);
seasonRoutes.get("/", getSeasonListHandler);
seasonRoutes.get("/:seasonId", getSeasonHandler);
seasonRoutes.delete("/:seasonId", authenticate, deleteSeasonHandler);
seasonRoutes.patch("/:seasonId", authenticate, updateSeasonHandler);

export default seasonRoutes;
