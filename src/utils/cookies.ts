import { CookieOptions, Response } from "express";
import { NODE_ENV } from "../constants/env.js";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date.js";

const secureOption = NODE_ENV !== "development";
export const REFRESH_PATH = `/api/v1/auth/refresh`;

const ACCESS_TOKEN_NAME = "";
const REFRESH_TOKEN_NAME = "";

const cookieDefaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure: secureOption,
};

const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...cookieDefaults,
  expires: fifteenMinutesFromNow(),
});
const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...cookieDefaults,
  expires: thirtyDaysFromNow(),
  path: REFRESH_PATH,
});

type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) => {
  return res
    .cookie("archery-access-token", accessToken, getAccessTokenCookieOptions())
    .cookie(
      "archery-refresh-token",
      refreshToken,
      getRefreshTokenCookieOptions()
    );
};

export const clearAuthCookies = (res: Response) => {
  return res.clearCookie("").clearCookie("", { path: REFRESH_PATH });
};
