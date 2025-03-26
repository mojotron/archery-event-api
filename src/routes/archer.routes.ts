import { Router } from "express";
import {
  createArcherHandler,
  getArcherListHandler,
  getArcherHandler,
  updateArcherHandler,
  deleteArcherHandler,
} from "../controllers/archer.controller";
import authenticate from "../middlewares/authenticate";

const archerRoutes = Router();

archerRoutes.post("/", authenticate, createArcherHandler);
archerRoutes.get("/", getArcherListHandler);
archerRoutes.get("/:archerId", getArcherHandler);
archerRoutes.patch("/:archerId", authenticate, updateArcherHandler);
archerRoutes.delete("/:archerId", authenticate, deleteArcherHandler);

export default archerRoutes;
