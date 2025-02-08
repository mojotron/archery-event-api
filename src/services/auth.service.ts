import prisma from "../config/prisma.js";
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from "../constants/http.js";
import appAsserts from "../utils/appAssert.js";
import { thirtyDaysFromNow } from "../utils/date.js";
import sendMail from "../utils/sendMail.js";
import { getVerifyEmailTemplate } from "../utils/emailTemplates.js";
import { APP_ORIGIN_CLIENT } from "../constants/env.js";
import { comparePasswords, hashPassword } from "../utils/bcrypt.js";
import { signAccessToken, signRefreshToken } from "../utils/jwt.js";

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
