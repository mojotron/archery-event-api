import { Request, Response, NextFunction } from "express";
import {
  FieldValidationError,
  ValidationError,
  validationResult,
} from "express-validator";

const formatErrorMessages = (errors: ValidationError[]) => {
  const errorsObject: { [key: string]: string[] } = {};

  errors.forEach((error) => {
    const err = error as FieldValidationError;
    if (errorsObject[err.path]) {
      errorsObject[err.path]?.push(err.msg);
    } else {
      errorsObject[err.path] = [err.msg];
    }
  });

  return errorsObject;
};

const signupValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);

  const errors = formatErrorMessages(result.array());
  console.log(errors);
  next();
};

export { signupValidationMiddleware };
