import { Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, firstName, lastName, password, confirmPassword } =
      matchedData(req);

    res.status(201).json({ msg: `user signup successfully` });
  } catch (error) {
    next(error);
  }
};

export { signup };
