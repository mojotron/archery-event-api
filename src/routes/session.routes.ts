import { Router } from "express";
import {
  getSessionsHandler,
  deleteSessionHandler,
} from "../controllers/session.controller.js";

const sessionRoutes = Router();

sessionRoutes.get("/", getSessionsHandler);
sessionRoutes.delete("/:sessionId", deleteSessionHandler);

export default sessionRoutes;
