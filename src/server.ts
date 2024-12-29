import "dotenv/config";
import express from "express";
//
import routes from "./routes/index.js";

const port = process.env.PORT;
const app = express();

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
