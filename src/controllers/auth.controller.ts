import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  verificationCodeSchema,
} from "./auth.schema.js";
import {
  createAccount,
  verifyEmail,
  loginUser,
  refreshAccessToken,
  sendPasswordResetEmail,
} from "../services/auth.service.js";
import { CREATED, OK, UNAUTHORIZED } from "../constants/http.js";
import {
  ACCESS_COOKIE_NAME,
  REFRESH_COOKIE_NAME,
  clearAuthCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthCookies,
} from "../utils/cookies.js";
import { AccessTokenPayload, verifyToken } from "../utils/jwt.js";
import prisma from "../config/prisma.js";
import appAsserts from "../utils/appAssert.js";

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

export const logoutHandler = catchErrors(
  async (req: Request, res: Response) => {
    const accessToken = req.cookies[ACCESS_COOKIE_NAME] as string | undefined;

    const { payload } = verifyToken<AccessTokenPayload>(
      accessToken || "",
      "access"
    );

    if (payload) {
      await prisma.session.delete({ where: { id: payload.sessionId } });
    }

    return clearAuthCookies(res)
      .status(OK)
      .json({ message: "User logout successful" });
  }
);

export const refreshHandler = catchErrors(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies[REFRESH_COOKIE_NAME] as string | undefined;
    console.log(refreshToken);

    appAsserts(refreshToken, UNAUTHORIZED, "Missing refresh token");

    const { accessToken, newRefreshToken } = await refreshAccessToken(
      refreshToken
    );

    if (newRefreshToken) {
      res.cookie(
        REFRESH_COOKIE_NAME,
        newRefreshToken,
        getRefreshTokenCookieOptions()
      );
    }

    return res
      .cookie(ACCESS_COOKIE_NAME, accessToken, getAccessTokenCookieOptions())
      .status(OK)
      .json({ message: "Access token refresh successful" });
  }
);

export const sendPasswordResetHandler = catchErrors(
  async (req: Request, res: Response) => {
    const email = emailSchema.parse(req.body.email);

    await sendPasswordResetEmail(email);
  }
);

export const resetPasswordHandler = catchErrors(
  async (req: Request, res: Response) => {}
);
