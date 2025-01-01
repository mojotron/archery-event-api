import { Request, Response, NextFunction } from "express";
import { CustomApiError } from "../errors/index.js";

const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomApiError) {
    // TODO react error api
  }
};

export { notFoundMiddleware, errorHandlerMiddleware };
