import { RequestHandler } from "express";
import prisma from "../config/prisma";
import appAsserts from "../utils/appAssert";
import { NOT_FOUND, UNAUTHORIZED } from "../constants/http";

const isAdmin: RequestHandler = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { role: true },
    });
    appAsserts(user, NOT_FOUND, "user not found");
    appAsserts(user.role === "admin", UNAUTHORIZED, "restricted to admins");

    next();
  } catch (error) {
    next(error);
  }
};

export default isAdmin;
