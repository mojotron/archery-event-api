type JsonResponseValidationError = {
  status: "validation-error";
  message: string;
  inputErrors: { [key: string]: string[] };
};

export type { JsonResponseValidationError };
