import { Request, Response, NextFunction } from "express";
import catchErrors from "../utils/catchErrors.js";
import { CREATED, OK } from "../constants/http.js";
// validation schema
import { loginSchema, registerSchema } from "./authSchemas.js";
// auth service
import { createAccount, loginUser } from "../services/authService.js";
import { setAuthCookies } from "../utils/cookies.js";

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

    const { user, accessToken, refreshToken } = await createAccount(request);

    return setAuthCookies({ res, accessToken, refreshToken })
      .status(CREATED)
      .json(user);
  }
);

const loginHandler = catchErrors(async (req: Request, res: Response) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  const { accessToken, refreshToken } = await loginUser(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json({ message: "user login successful" });
});

const logoutHandler = catchErrors(async (req: Request, res: Response) => {});

export { registerHandler, loginHandler, logoutHandler };
