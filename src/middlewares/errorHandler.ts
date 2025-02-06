import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http.js";
import { ZodError } from "zod";

const zodErrorHandler = (res: Response, err: ZodError) => {
  const inputErrors = err.issues.map((issue) => ({ message: issue.message }));

  return res
    .status(BAD_REQUEST)
    .json({ message: `Form input error`, inputErrors });
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    zodErrorHandler(res, err);
    return;
  }

  res.status(INTERNAL_SERVER_ERROR).json({ message: `Internal Server Error` });
  return;
};

export default errorHandler;
