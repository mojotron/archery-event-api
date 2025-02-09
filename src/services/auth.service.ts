import prisma from "../config/prisma.js";
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from "../constants/http.js";
import appAsserts from "../utils/appAssert.js";
import { thirtyDaysFromNow, ONE_DAY_MS } from "../utils/date.js";
import sendMail from "../utils/sendMail.js";
import { getVerifyEmailTemplate } from "../utils/emailTemplates.js";
import { APP_ORIGIN_CLIENT } from "../constants/env.js";
import { comparePasswords, hashPassword } from "../utils/bcrypt.js";
import {
  RefreshTokenPayload,
  signAccessToken,
  signRefreshToken,
  verifyToken,
} from "../utils/jwt.js";

type CreateAccountParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const createAccount = async ({
  firstName,
  lastName,
  email,
  password,
}: CreateAccountParams) => {
  // check is user exist with given email
  const userExist = await prisma.user.findUnique({
    where: { email: email },
  });
  appAsserts(!userExist, CONFLICT, "email already in use");
  // create user
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });
  // create verification
  const verification = await prisma.verificationCode.create({
    data: {
      userId: user.id,
      type: "EmailVerification",
      expiresAt: thirtyDaysFromNow(),
    },
  });
  // send email
  const url = `${APP_ORIGIN_CLIENT}/email/verify/${verification.id}`;
  const { error } = await sendMail({
    to: user.email,
    ...getVerifyEmailTemplate(url),
  });
  if (error) {
    console.log("verification mail error", error);
  }
  // return user data
  return {
    user: { id: user.id },
  };
};

export const verifyEmail = async (code: string) => {
  // get verification record and validate it
  const verification = await prisma.verificationCode.findUnique({
    where: {
      id: code,
      type: "EmailVerification",
      expiresAt: { gt: new Date() },
    },
  });
  appAsserts(
    verification,
    NOT_FOUND,
    "Invalid or expired email verification code"
  );
  // update user
  const updatedUser = await prisma.user.update({
    where: { id: verification.userId },
    data: { isVerified: true },
  });
  appAsserts(updatedUser, INTERNAL_SERVER_ERROR, "Failed to verify user");
  // delete verification record
  await prisma.verificationCode.delete({ where: { id: verification.id } });

  return {
    user: { id: updatedUser.id },
  };
};

type LoginUserParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const loginUser = async ({
  email,
  password,
  userAgent,
}: LoginUserParams) => {
  // get user
  const user = await prisma.user.findUnique({ where: { email } });
  appAsserts(user, UNAUTHORIZED, "Invalid email or password");
  // check password
  const isValidPassword = await comparePasswords(password, user.password);
  appAsserts(isValidPassword, UNAUTHORIZED, "Invalid email or password");
  // check if user has verified email
  appAsserts(user.isVerified, UNAUTHORIZED, "Email not verified");
  // create session
  const session = await prisma.session.create({
    data: {
      userId: user.id,
      userAgent,
      expiresAt: thirtyDaysFromNow(),
    },
  });
  // sign jwt tokens
  const userId = user.id;
  const sessionId = session.id;
  const accessToken = signAccessToken({ userId, sessionId });
  const refreshToken = signRefreshToken({ sessionId });
  // return user and tokens
  return {
    user: { userId },
    accessToken,
    refreshToken,
  };
};

export const refreshAccessToken = async (refreshToken: string) => {
  // verify refresh token
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, "refresh");
  appAsserts(payload, UNAUTHORIZED, "Invalid refresh token");
  // get user session
  const session = await prisma.session.findUnique({
    where: { id: payload.sessionId },
  });
  const now = Date.now();
  appAsserts(
    session && session.expiresAt.getTime() > now,
    UNAUTHORIZED,
    "Session expired"
  );
  // refresh session is expires in next 24 hour
  const sessionNeedsRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS;
  if (sessionNeedsRefresh) {
    await prisma.session.update({
      where: { id: session.id },
      data: { expiresAt: thirtyDaysFromNow() },
    });
  }
  const newRefreshToken = sessionNeedsRefresh
    ? signRefreshToken({ sessionId: session.id })
    : undefined;
  // sign access token
  const accessToken = signAccessToken({
    userId: session.userId,
    sessionId: session.id,
  });
  // return tokens
  return {
    accessToken,
    newRefreshToken,
  };
};

export const sendPasswordResetEmail = async (email: string) => {
  // catch errors to prevent leaking user data to client, always return success
  try {
    // get user
    // allow only to reset request per 5 min
    // create verification code
    // send email
    // return url and email id
  } catch (error: any) {
    console.log(`SendPasswordResetError: ${error.message}`);
    return {};
  }
};
