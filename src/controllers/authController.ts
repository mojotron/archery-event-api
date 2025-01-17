import { Request, Response, NextFunction } from "express";
import catchErrors from "../utils/catchErrors.js";
import { CREATED } from "../constants/http.js";
// validation schema
import { registerSchema } from "./authSchemas.js";
// auth service
import { createAccount } from "../services/authService.js";

// handlers
// 1. validate request
// 2. call service
// 3. return response

const registerHandler = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const request = registerSchema.parse({
      ...req.body,
      userAgent: req.headers["user-agent"],
    });

    await createAccount(request);

    res.status(CREATED).json(request);
  }
);

export { registerHandler };
