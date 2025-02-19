import { RequestHandler } from "express";
import { ACCESS_COOKIE_NAME } from "../utils/cookies.js";
import appAsserts from "../utils/appAssert.js";
import { UNAUTHORIZED } from "../constants/http.js";
import AppErrorCodes from "../constants/appErrorCodes.js";
import { AccessTokenPayload, verifyToken } from "../utils/jwt.js";

const authenticate: RequestHandler = (req, res, next) => {
  // get access token
  const accessToken = req.cookies[ACCESS_COOKIE_NAME] as string | undefined;
  appAsserts(
    accessToken,
    UNAUTHORIZED,
    "Not Authorized",
    AppErrorCodes.InvalidAccessToken
  );
  // decode token
  const { payload, error } = verifyToken<AccessTokenPayload>(
    accessToken,
    "access"
  );
  appAsserts(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Invalid token",
    AppErrorCodes.InvalidAccessToken
  );
  // assign user and session to req
  req.userId = payload.userId;
  req.sessionId = payload.sessionId;
  next();
};

export default authenticate;
