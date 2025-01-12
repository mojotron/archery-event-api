import "dotenv/config";
import express from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import cookieParser from "cookie-parser";
//
import routes from "./routes/index.js";
import {
  notFoundMiddleware,
  errorHandlerMiddleware,
} from "./middlewares/errorMiddlewares.js";
import prismaClient from "./config/prisma/client.js";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
});

const port = process.env.PORT;
const app = express();
//
app.use(helmet());
app.use(limiter);
app.use(cors());
app.use(cookieParser());
// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes
app.use(routes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const startServer = async () => {
  try {
    app.listen(port, () => console.log(`server listening at port ${port}`));
  } catch (error) {
    console.log(error);
    prismaClient.$disconnect();
    process.exit(1);
  }
};

startServer();
