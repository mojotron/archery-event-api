import CustomApiError from "./CustomApiError";

const defaultMessage = `Client input fails validation.`;

class BadRequestError extends CustomApiError {
  statusCode: number;

  constructor(message: string = defaultMessage) {
    super(message);
    this.statusCode = 400;
  }
}

export default BadRequestError;
