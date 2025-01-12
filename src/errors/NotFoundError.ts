import CustomApiError from "./CustomApiError.js";

const defaultMessage = `Requested resources is not found.`;

class NotFoundError extends CustomApiError {
  statusCode: number;

  constructor(message: string = defaultMessage) {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFoundError;
