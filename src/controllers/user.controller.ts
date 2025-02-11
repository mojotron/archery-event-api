import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import { getUser } from "../services/user.service.js";
import { OK } from "../constants/http.js";

export const getUserHandler = catchErrors(
  async (req: Request, res: Response) => {
    const { user } = await getUser(req.userId);

    return res.status(OK).json({ message: "user data", user });
  }
);
