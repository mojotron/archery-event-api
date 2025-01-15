import { Request, Response, NextFunction } from "express";
import {} from "./authSchemas.js";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(201).json({ msg: `user signup successfully` });
  } catch (error) {
    next(error);
  }
};

export { signup };
