import assert from "node:assert";
import { HttpStatusCode } from "../constants/http.js";
import AppErrorCode from "../constants/appErrorCode.js";
import AppError from "./AppError.js";

/**
 * Asserts a condition and throws an AppError if condition is falsy
 */
type AppAssert = (
  condition: any,
  statusCode: HttpStatusCode,
  message: string,
  errorCode?: AppErrorCode
) => asserts condition;

const appAssert: AppAssert = (condition, statusCode, message, errorCode) =>
  assert(condition, new AppError(statusCode, message, errorCode));

export default appAssert;
