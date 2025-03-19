import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import authenticate from "../middlewares/authenticate.js";
import sessionRoutes from "./session.routes.js";
import seasonRoutes from "./season.routes.js";
import tournamentRoutes from "./tournament.routes.js";
import scorecardRoutes from "./scorecards.routes.js";
import clubRoutes from "./club.routes.js";
import archerRoutes from "./archer.routes.js";

const routes = Router();

routes.use("/auth", authRoutes);
// protected routes user
routes.use("/user", authenticate, userRoutes);
routes.use("/sessions", authenticate, sessionRoutes);
//
routes.use("/clubs", clubRoutes);
routes.use("/archers", archerRoutes);
routes.use("/seasons", seasonRoutes);
routes.use("/tournaments", authenticate, tournamentRoutes);
routes.use("/scorecards", authenticate, scorecardRoutes);

export default routes;
