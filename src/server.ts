import "dotenv/config";
import express from "express";
import prisma from "./config/prisma.js";
import { PORT, NODE_ENV } from "./constants/env.js";
import routes from "./routes/index.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
