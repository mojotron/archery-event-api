import assert from "node:assert";
import { HttpStatusCodes } from "../constants/http.js";
import AppErrorCodes from "../constants/appErrorCodes.js";
import AppError from "./AppError.js";

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCodes,
  message: string,
  errorCode?: AppErrorCodes
) => asserts condition;

const appAsserts: AppAssert = (condition, httpStatusCode, message, errorCode) =>
  assert(condition, new AppError(httpStatusCode, message, errorCode));

export default appAsserts;
