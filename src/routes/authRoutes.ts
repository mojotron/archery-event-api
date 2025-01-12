import { Router } from "express";
import { signupValidator } from "../config/validators/authValidators.js";
import { signupValidationMiddleware } from "../middlewares/validationMiddlewares.js";
import { signup } from "../controllers/authController.js";

const router = Router();

router.use("/signup", signupValidator, signupValidationMiddleware, signup);
export default router;
