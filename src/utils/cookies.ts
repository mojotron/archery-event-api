import { CookieOptions, Response } from "express";
import { NODE_ENV } from "../constants/env.js";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date.js";

export const REFRESH_PATH = "/api/v1/auth/refresh";
export const ACCESS_COOKIE_NAME = "archery-event-access-token";
export const REFRESH_COOKIE_NAME = "archery-event-refresh-token";

const defaultOptions: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure: NODE_ENV !== "development",
};

export const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaultOptions,
  expires: fifteenMinutesFromNow(),
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaultOptions,
  expires: thirtyDaysFromNow(),
  path: REFRESH_PATH,
});

type SetAuthCookiesParams = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export const setAuthCookies = ({
  res,
  accessToken,
  refreshToken,
}: SetAuthCookiesParams) => {
  return res
    .cookie(ACCESS_COOKIE_NAME, accessToken, getAccessTokenCookieOptions())
    .cookie(REFRESH_COOKIE_NAME, refreshToken, getRefreshTokenCookieOptions());
};

export const clearAuthCookies = (res: Response) => {
  return res
    .clearCookie(ACCESS_COOKIE_NAME)
    .clearCookie(REFRESH_COOKIE_NAME, { path: REFRESH_PATH });
};
