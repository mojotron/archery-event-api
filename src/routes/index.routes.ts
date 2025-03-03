import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import authenticate from "../middlewares/authenticate.js";
import sessionRoutes from "./session.routes.js";
// admin
import seasonRoutes from "./season.routes.js";
import tournamentRoutes from "./tournament.routes.js";

const routes = Router();

routes.use("/auth", authRoutes);
// protected routes user
routes.use("/user", authenticate, userRoutes);
routes.use("/sessions", authenticate, sessionRoutes);
// protected routes
routes.use("/seasons", authenticate, seasonRoutes);
routes.use("/tournaments", authenticate, tournamentRoutes);

export default routes;
