import "dotenv/config";
import express from "express";
import prisma from "./config/prisma.js";
import { PORT, NODE_ENV, APP_ORIGIN_CLIENT } from "./constants/env.js";
import routes from "./routes/index.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [APP_ORIGIN_CLIENT],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1", routes);
app.use(errorHandler);

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT} in ${NODE_ENV} environment`);
    });
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();
