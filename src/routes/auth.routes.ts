import { Router } from "express";
import {
  registerHandler,
  verifyEmailHandler,
} from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.get("/email/verify/:code", verifyEmailHandler);

export default authRoutes;
