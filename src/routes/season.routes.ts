import { Router } from "express";
import {
  createSeasonHandler,
  getSeasonsHandler,
  getSingleSeasonHandler,
  deleteSeasonHandler,
  updateSeasonHandler,
} from "../controllers/season.controller.js";

const seasonRoutes = Router();

seasonRoutes.get("/", getSeasonsHandler);
seasonRoutes.get("/:seasonId", getSingleSeasonHandler);
seasonRoutes.post("/", createSeasonHandler);
seasonRoutes.delete("/:seasonId", deleteSeasonHandler);
seasonRoutes.patch("/:seasonId", updateSeasonHandler);

export default seasonRoutes;
