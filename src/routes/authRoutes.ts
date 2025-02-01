import { Router } from "express";

import {
  registerHandler,
  loginHandler,
  logoutHandler,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.get("/logout", logoutHandler);

export default router;
