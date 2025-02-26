import { Router } from "express";
import {
  createSeasonHandler,
  getSeasonsHandler,
  getSingleSeasonHandler,
  deleteSeasonHandler,
  updateSeasonHandler,
} from "../controllers/season.controller.js";
import isAdmin from "../middlewares/isAdmin.js";

const seasonRoutes = Router();

seasonRoutes.get("/", getSeasonsHandler);
seasonRoutes.get("/:seasonId", getSingleSeasonHandler);
seasonRoutes.post("/", isAdmin, createSeasonHandler);
seasonRoutes.delete("/:seasonId", isAdmin, deleteSeasonHandler);
seasonRoutes.patch("/:seasonId", isAdmin, updateSeasonHandler);

export default seasonRoutes;
