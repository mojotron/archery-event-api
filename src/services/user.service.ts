import prisma from "../config/prisma.js";
import { NOT_FOUND } from "../constants/http.js";
import appAsserts from "../utils/appAssert.js";

export const getUser = async (userId: string) => {
  // find user
  const user = await prisma.user.findUnique({ where: { id: userId } });
  appAsserts(user, NOT_FOUND, "User not found");
  // return user data
  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isAdmin: user.role === "admin",
    },
  };
};

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  return { users };
};
