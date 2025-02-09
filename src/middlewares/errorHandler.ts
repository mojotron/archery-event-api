import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http.js";
import { ZodError } from "zod";
import AppError from "../utils/AppError.js";
import { REFRESH_PATH, clearAuthCookies } from "../utils/cookies.js";

const zodErrorHandler = (res: Response, err: ZodError) => {
  const inputErrors = err.issues.map((issue) => ({ message: issue.message }));

  return res
    .status(BAD_REQUEST)
    .json({ message: `Form input error`, inputErrors });
};

const appErrorHandler = (res: Response, err: AppError) => {
  return res
    .status(err.statusCode)
    .json({ message: err.message, errorCode: err.errorCode });
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(`PATH ${req.path}`, err);

  if (req.path === REFRESH_PATH) {
    clearAuthCookies(res);
  }

  if (err instanceof ZodError) {
    zodErrorHandler(res, err);
    return;
  }

  if (err instanceof AppError) {
    appErrorHandler(res, err);
    return;
  }

  res.status(INTERNAL_SERVER_ERROR).json({ message: `Internal Server Error` });
  return;
};

export default errorHandler;
