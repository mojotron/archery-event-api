import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import {
  loginSchema,
  registerSchema,
  verificationCodeSchema,
} from "./auth.schema.js";
import {
  createAccount,
  verifyEmail,
  loginUser,
} from "../services/auth.service.js";
import { CREATED, OK } from "../constants/http.js";
import { setAuthCookies } from "../utils/cookies.js";

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

export const loginHandler = catchErrors(async (req: Request, res: Response) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { accessToken, refreshToken } = await loginUser(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json({ message: "user login successful" });
});
