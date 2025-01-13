import { Router } from "express";
import { signupValidator } from "../config/validators/authValidators.js";
import validationMiddleware from "../middlewares/validationMiddlewares.js";
import { signup } from "../controllers/authController.js";

const router = Router();

router.use("/signup", signupValidator, validationMiddleware, signup);
export default router;
