import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import { registerSchema } from "./auth.schema.js";
import { createAccount } from "../services/auth.service.js";
import { CREATED } from "../constants/http.js";

export const registerHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = registerSchema.parse({
      ...req.body,
    });

    await createAccount(request);

    return res.status(CREATED).json({
      message: `Account successfully created. Check you email and complete verification!`,
    });
  }
);
