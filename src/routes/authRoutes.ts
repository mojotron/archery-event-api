import { Router } from "express";

import { registerHandler } from "../controllers/authController.js";

const router = Router();

router.use("/register", registerHandler);
export default router;
