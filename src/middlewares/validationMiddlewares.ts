import { Request, Response, NextFunction } from "express";
import { FieldValidationError, validationResult } from "express-validator";
import type { JsonResponseValidationError } from "../types/JsonResponseTypes";

const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    // data is validated and correct, go to next middleware in cain
    next();
  }

  const inputErrors: { [key: string]: string[] } = {};

  result.array().forEach((error) => {
    const err = error as FieldValidationError;
    const path = err.path;

    if (inputErrors[path]) {
      inputErrors[path]?.push(err.msg);
    } else {
      inputErrors[path] = [err.msg];
    }
  });

  const responseJson: JsonResponseValidationError = {
    status: "validation-error",
    message: "incorrect input filed data",
    inputErrors,
  };

  res.status(409).json(responseJson);
  return;
};

export default validationMiddleware;
