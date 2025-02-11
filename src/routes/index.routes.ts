import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import authenticate from "../middlewares/authenticate.js";
import sessionRoutes from "./session.routes.js";

const routes = Router();

routes.use("/auth", authRoutes);
// protected routes
routes.use("/user", authenticate, userRoutes);
routes.use("/sessions", authenticate, sessionRoutes);

export default routes;
