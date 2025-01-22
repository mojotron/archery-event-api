import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";
import { comparePasswords, hashPassword } from "../utils/bcrypt.js";
import appAssert from "../utils/appAssert.js";
import { oneYearFromNow, thirtyDaysFromNow } from "../utils/date.js";
import { JWT_REFRESH_SECRET, JWT_ACCESS_SECRET } from "../constants/env.js";
import { CONFLICT, UNAUTHORIZED } from "../constants/http.js";
import { refreshTokenSignOptions, signToken } from "../utils/jwt.js";

export type CreateAccountParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userAgent?: string | undefined;
};

export const createAccount = async (data: CreateAccountParams) => {
  // verify existing user
  const userExist = await prisma.user.findUnique({
    where: { email: data.email },
  });
  appAssert(!userExist, CONFLICT, "Email already in use");
  // create user
  const hashedPassword = await hashPassword(data.password);
  const newUser = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      verified: true,
      role: true,
    },
  });
  // create verification code
  const verificationCode = await prisma.verificationCode.create({
    data: {
      userId: newUser.id,
      type: "EmailVerification",
      expiresAt: oneYearFromNow(),
    },
  });
  // send verification email
  // create session
  const session = await prisma.session.create({
    data: {
      userId: newUser.id,
      expiresAt: thirtyDaysFromNow(),
      userAgent: data.userAgent,
    },
  });
  // sign access and refresh tokens
  const refreshToken = signToken(
    { sessionId: session.id },
    refreshTokenSignOptions
  );

  const accessToken = signToken({ userId: newUser.id, sessionId: session.id });
  // return user and tokens
  return { user: newUser, accessToken, refreshToken };
};

export type LoginUserParams = {
  email: string;
  password: string;
  userAgent?: string | undefined;
};

export const loginUser = async (data: LoginUserParams) => {
  // verify user (exists)
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  appAssert(user, UNAUTHORIZED, "User email or password invalid");
  // validate passwords
  const correctPassword = await comparePasswords(data.password, user.password);
  appAssert(correctPassword, UNAUTHORIZED, "User email or password invalid");
  // create session
  const session = await prisma.session.create({
    data: {
      userId: user.id,
      expiresAt: thirtyDaysFromNow(),
      userAgent: data.userAgent,
    },
  });
  // create tokens
  const accessToken = signToken({ userId: user.id, sessionId: session.id });
  const refreshToken = signToken(
    { sessionId: session.id },
    refreshTokenSignOptions
  );
  // return user and tokens
  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      verified: user.verified,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};
