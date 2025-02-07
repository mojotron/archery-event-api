import prisma from "../config/prisma.js";
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../constants/http.js";
import appAsserts from "../utils/appAssert.js";
import { thirtyDaysFromNow } from "../utils/date.js";
import sendMail from "../utils/sendMail.js";
import { getVerifyEmailTemplate } from "../utils/emailTemplates.js";
import { APP_ORIGIN_CLIENT } from "../constants/env.js";
import { hashPassword } from "../utils/bcrypt.js";
import { date } from "zod";

type CreateAccountParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  // check is user exist with given email
  const userExist = await prisma.user.findUnique({
    where: { email: data.email },
  });
  appAsserts(!userExist, CONFLICT, "email already in use");
  // create user
  const hashedPassword = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
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
