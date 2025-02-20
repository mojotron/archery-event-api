import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import authenticate from "../middlewares/authenticate.js";
import sessionRoutes from "./session.routes.js";
// admin
import seasonRoutes from "./season.routes.js";

const routes = Router();

routes.use("/auth", authRoutes);
// protected routes user
routes.use("/user", authenticate, userRoutes);
routes.use("/sessions", authenticate, sessionRoutes);
// protected routes + admin
routes.use("/admin/season", authenticate, seasonRoutes);

export default routes;
