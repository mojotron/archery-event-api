import { Router } from "express";
import {
  createClubHandler,
  getClubHandler,
  getClubListHandler,
  updateClubHandler,
  deleteClubHandler,
} from "../controllers/club.controller";
import authenticate from "../middlewares/authenticate";

const clubRoutes = Router();

clubRoutes.get("/", getClubListHandler);
clubRoutes.post("/", authenticate, createClubHandler);
clubRoutes.get("/:clubId", getClubHandler);
clubRoutes.patch("/:clubId", authenticate, updateClubHandler);
clubRoutes.delete("/:clubId", authenticate, deleteClubHandler);

export default clubRoutes;
