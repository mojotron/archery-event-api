import CustomApiError from "./CustomApiError";

const defaultMessage = `Current user is not authorized to access a resource`;

class UnauthorizedError extends CustomApiError {
  statusCode: number;

  constructor(message: string = defaultMessage) {
    super(message);
    this.statusCode = 401;
  }
}

export default UnauthorizedError;
