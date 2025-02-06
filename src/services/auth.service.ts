import prisma from "../config/prisma.js";
import { CONFLICT } from "../constants/http.js";
import appAsserts from "../utils/appAssert.js";
import { thirtyDaysFromNow } from "../utils/date.js";

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
  const hashedPassword = data.password;
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
  // return user data
  return {
    user: { id: user.id },
  };
};
