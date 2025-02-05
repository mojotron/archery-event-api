import "dotenv/config";
import express from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import cookieParser from "cookie-parser";
//

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
});

const app = express();
//
app.use(helmet());
app.use(limiter);
app.use(
  cors({
    origin: APP_ORIGIN_ADMIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes
app.use(routes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const startServer = async () => {
  try {
    app.listen(PORT, () => console.log(`server listening at PORT ${PORT}`));
  } catch (error) {
    console.log(error);
    prisma.$disconnect();
    process.exit(1);
  }
};

startServer();
