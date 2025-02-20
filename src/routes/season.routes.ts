import { Router } from "express";
import { createSeasonHandler } from "../controllers/season.controller.js";

const seasonRoutes = Router();

seasonRoutes.post("/", createSeasonHandler);

export default seasonRoutes;
