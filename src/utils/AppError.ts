import AppErrorCodes from "../constants/appErrorCodes.js";
import { HttpStatusCodes } from "../constants/http.js";

class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCodes,
    public message: string,
    public errorCode?: AppErrorCodes
  ) {
    super(message);
  }
}

export default AppError;
