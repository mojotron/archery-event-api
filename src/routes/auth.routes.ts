import { Router } from "express";
import {
  registerHandler,
  verifyEmailHandler,
  loginHandler,
  logoutHandler,
  refreshHandler,
} from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.get("/logout", logoutHandler);
authRoutes.get("/refresh", refreshHandler);
authRoutes.get("/email/verify/:code", verifyEmailHandler);

export default authRoutes;
