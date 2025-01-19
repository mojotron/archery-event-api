import { ErrorRequestHandler, RequestHandler, Response } from "express";
import { z } from "zod";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../constants/http.js";
import AppError from "../utils/AppError.js";

const notFoundMiddleware: RequestHandler = (req, res, next) => {
  res
    .status(NOT_FOUND)
    .json({ message: "Resource is not found, check if url is correct!" });
  return;
};

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));

  return res.status(BAD_REQUEST).json({ message: error.message, errors });
};

const handleAppError = (res: Response, error: AppError) => {
  return res
    .status(error.statusCode)
    .json({ message: error.message, errorCode: error.errorCode });
};

const errorHandlerMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${(req.path, error)}`);

  if (error instanceof z.ZodError) {
    handleZodError(res, error);
    return;
  }

  if (error instanceof AppError) {
    handleAppError(res, error);
    return;
  }

  res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  return;
};

export { notFoundMiddleware, errorHandlerMiddleware };
