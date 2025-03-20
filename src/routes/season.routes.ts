import { Router } from "express";
import {
  createSeasonScan3DHandler,
  getSeasonsScan3DHandler,
} from "../controllers/seasonScan3D.controller.js";
import { createSeasonWAHandler } from "../controllers/seasonWA.controller.js";
import authenticate from "../middlewares/authenticate.js";

const scan3D = "scandinavian3D";
const wa = "worldArchery";

const seasonRoutes = Router();
// scan 3d
seasonRoutes.post(`/${scan3D}`, authenticate, createSeasonScan3DHandler);
seasonRoutes.get(`/${scan3D}`, getSeasonsScan3DHandler);
seasonRoutes.get(`/${scan3D}/:seasonId`, createSeasonScan3DHandler);
// wa target
seasonRoutes.post(`/#${wa}`, authenticate, createSeasonWAHandler);
export default seasonRoutes;
