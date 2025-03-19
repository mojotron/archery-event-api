import { Router } from "express";
import { createSeasonScan3DHandler } from "../controllers/seasonScan3D.controller.js";
import isAdmin from "../middlewares/isAdmin.js";
import authenticate from "../middlewares/authenticate.js";

const scan3D = "scandinavian3D";

const seasonRoutes = Router();
// refactor
seasonRoutes.post(`/${scan3D}`, authenticate, createSeasonScan3DHandler);
seasonRoutes.get(`/${scan3D}`, createSeasonScan3DHandler);
seasonRoutes.get(`/${scan3D}/:seasonId`, createSeasonScan3DHandler);

export default seasonRoutes;
