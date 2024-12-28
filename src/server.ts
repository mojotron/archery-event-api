import "dotenv/config";
import express from "express";

const port = process.env.PORT;
const app = express();

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    app.listen(port, () => console.log(`server listening at port ${port}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
