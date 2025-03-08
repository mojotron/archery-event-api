import { Router } from "express";
import {
  getUserHandler,
  getUserListHandler,
} from "../controllers/user.controller.js";
import isAdmin from "../middlewares/isAdmin.js";

const userRoutes = Router();

userRoutes.get("/", getUserHandler);
userRoutes.get("/list", isAdmin, getUserListHandler);

export default userRoutes;
