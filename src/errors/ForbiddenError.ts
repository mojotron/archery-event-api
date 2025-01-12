import CustomApiError from "./CustomApiError.js";

const defaultMessage = `Current user is not allowed to access resource.`;

class ForbiddenError extends CustomApiError {
  statusCode: number;

  constructor(message: string = defaultMessage) {
    super(message);
    this.statusCode = 403;
  }
}

export default ForbiddenError;
