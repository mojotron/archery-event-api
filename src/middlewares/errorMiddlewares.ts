import { Request, Response, NextFunction } from "express";

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
) => {};

export { notFoundMiddleware, errorHandlerMiddleware };
