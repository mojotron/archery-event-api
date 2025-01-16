import { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";
import { INTERNAL_SERVER_ERROR } from "../constants/http.js";

const handleZodError = () => {};

const notFoundMiddleware: RequestHandler = (req, res, next) => {};

const errorHandlerMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${(req.path, error)}`);

  // if (err instanceof ZodError) {
  //   handleZodError();
  // }
  console.log("HELLO");

  res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  return;
};

export { notFoundMiddleware, errorHandlerMiddleware };
