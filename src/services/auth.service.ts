import prisma from "../config/prisma.js";
// constants
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
} from "../constants/http.js";
import { APP_ORIGIN_CLIENT } from "../constants/env.js";
// throw error if condition false
import appAsserts from "../utils/appAssert.js";
// date helpers
import {
  thirtyDaysFromNow,
  ONE_DAY_MS,
  fiveMinutesAgo,
  oneHourFromNow,
} from "../utils/date.js";
// mail
import sendMail from "../utils/sendMail.js";
import {
  getVerifyEmailTemplate,
  getPasswordResetTemplate,
} from "../utils/emailTemplates.js";
// bcrypt utils
import { comparePasswords, hashPassword } from "../utils/bcrypt.js";
// jwt utils
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
    const user = await prisma.user.findUnique({ where: { email } });
    appAsserts(user, NOT_FOUND, "User not found");
    // allow only to reset request per 5 min
    const fiveMinAgo = fiveMinutesAgo();
    const countResets = await prisma.verificationCode.count({
      where: {
        userId: user.id,
        type: "PasswordReset",
        createdAt: { gt: fiveMinAgo },
      },
    });
    appAsserts(
      countResets <= 1,
      TOO_MANY_REQUESTS,
      "Too many requests, please try again later"
    );
    // create verification code
    const expiresAt = oneHourFromNow();
    const verification = await prisma.verificationCode.create({
      data: {
        userId: user.id,
        type: "PasswordReset",
        expiresAt,
      },
    });
    // send email
    const url = `${APP_ORIGIN_CLIENT}/password/reset?code=${
      verification.id
    }&expire=${expiresAt.getTime()}`;

    const { data, error } = await sendMail({
      to: user.email,
      ...getPasswordResetTemplate(url),
    });
    appAsserts(
      data?.id,
      INTERNAL_SERVER_ERROR,
      `${error?.name} - ${error?.message}`
    );
    // return url and email id
    return {
      url,
      emailId: data.id,
    };
  } catch (error: any) {
    console.log(`SendPasswordResetError: ${error.message}`);
    return {};
  }
};

type ResetPasswordParams = {
  verificationCode: string;
  password: string;
};

export const resetPassword = async ({
  verificationCode,
  password,
}: ResetPasswordParams) => {
  // verify verification code
  const verification = await prisma.verificationCode.findUnique({
    where: {
      id: verificationCode,
      type: "PasswordReset",
      expiresAt: { gt: new Date() },
    },
  });
  appAsserts(verification, NOT_FOUND, "Invalid or expired verification code");
  // update user
  const hashedPassword = await hashPassword(password);
  const updatedUser = await prisma.user.update({
    where: { id: verification.userId },
    data: { password: hashedPassword },
  });
  appAsserts(updatedUser, INTERNAL_SERVER_ERROR, "Failed to reset password");
  // remove all sessions
  await prisma.session.deleteMany({ where: { userId: updatedUser.id } });
  // delete verification
  await prisma.verificationCode.delete({ where: { id: verification.id } });
  // return user
  return {
    user: { userId: updatedUser.id },
  };
};
