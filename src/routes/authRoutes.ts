import { Router } from "express";

import { signup } from "../controllers/authController.js";

const router = Router();

router.use("/signup", signup);
export default router;
