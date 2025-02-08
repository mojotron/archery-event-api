import { Router } from "express";
import {
  registerHandler,
  verifyEmailHandler,
  loginHandler,
} from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.get("/email/verify/:code", verifyEmailHandler);

export default authRoutes;
