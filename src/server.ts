import "dotenv/config";
import express from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
//
import routes from "./routes/index.js";

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
// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const startServer = async () => {
  try {
    app.listen(port, () => console.log(`server listening at port ${port}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
