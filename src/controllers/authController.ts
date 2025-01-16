import { Request, Response, NextFunction } from "express";
import catchErrors from "../utils/catchErrors.js";
import { registerSchema } from "./authSchemas.js";
import { CREATED } from "../constants/http.js";

const registerHandler = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    throw Error("test error");
    const request = registerSchema.parse({
      ...req.body,
      userAgent: req.headers["user-agent"],
    });

    res.status(CREATED).json(request);
  }
);

export { registerHandler };
