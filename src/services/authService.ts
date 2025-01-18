import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";
import { hashPassword } from "../utils/bcrypt.js";
import { oneYearFromNow, thirtyDaysFromNow } from "../utils/date.js";
import { JWT_REFRESH_SECRET, JWT_ACCESS_SECRET } from "../constants/env.js";

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
  if (userExist) {
    throw new Error("user already exists");
  }
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
  const refreshToken = jwt.sign({ sessionId: session.id }, JWT_REFRESH_SECRET, {
    expiresIn: "30d",
    audience: ["user"],
  });
  const accessToken = jwt.sign(
    { userId: newUser.id, sessionId: session.id },
    JWT_ACCESS_SECRET,
    {
      expiresIn: "15m",
      audience: ["user"],
    }
  );
  // return user and tokens
  return { user: newUser, accessToken, refreshToken };
};
