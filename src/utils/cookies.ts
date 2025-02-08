import { CookieOptions, Response } from "express";
import { NODE_ENV } from "../constants/env.js";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date.js";

export const REFRESH_PATH = "/auth/refresh";
export const ACCESS_COOKIE_NAME = "archery-event-access-token";
export const REFRESH_COOKIE_NAME = "archery-event-refresh-token";

const defaultOptions: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure: NODE_ENV !== "development",
};

const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaultOptions,
  expires: fifteenMinutesFromNow(),
});

const getRefreshTokenCookieOptions = (): CookieOptions => ({
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
