import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors.js";
import { deleteSession, getSessions } from "../services/session.service.js";
import { OK } from "../constants/http.js";
import { sessionSchema } from "./session.schema.js";

export const getSessionsHandler = catchErrors(
  async (req: Request, res: Response) => {
    const { sessions } = await getSessions({
      userId: req.userId,
      currentSessionId: req.sessionId,
    });

    return res.status(OK).json({ message: "user sessions", sessions });
  }
);

export const deleteSessionHandler = catchErrors(
  async (req: Request, res: Response) => {
    const sessionId = sessionSchema.parse(req.params.sessionId);

    await deleteSession({ sessionId, userId: req.userId });

    return res.status(OK).json({ message: "Session delete successful" });
  }
);
