import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import { registerSchema, verificationCodeSchema } from "./auth.schema.js";
import { createAccount, verifyEmail } from "../services/auth.service.js";
import { CREATED, OK } from "../constants/http.js";

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

export const verifyEmailHandler = catchErrors(
  async (req: Request, res: Response) => {
    const code = verificationCodeSchema.parse(req.params.code);

    await verifyEmail(code);

    return res.status(OK).json({ message: "Email verified successfully" });
  }
);
