import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../constants/env.js";

export type AccessTokenPayload = {
  userId: string;
  sessionId: string;
};

export type RefreshTokenPayload = {
  sessionId: string;
};

export const signAccessToken = (payload: AccessTokenPayload) => {
  return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: "15m" });
};

export const signRefreshToken = (payload: RefreshTokenPayload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "30d" });
};

export const verifyToken = <TPayload>(
  token: string,
  type: "access" | "refresh"
) => {
  try {
    const secret = type === "access" ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;

    const payload = jwt.verify(token, secret) as TPayload;

    return {
      payload,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
