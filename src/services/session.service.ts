import prisma from "../config/prisma.js";
import { NOT_FOUND } from "../constants/http.js";
import appAsserts from "../utils/appAssert.js";

type GetSessionsParams = {
  userId: string;
  currentSessionId: string;
};

export const getSessions = async ({
  userId,
  currentSessionId,
}: GetSessionsParams) => {
  const now = new Date();
  // delete invalid sessions
  await prisma.session.deleteMany({
    where: { userId, expiresAt: { lt: now } },
  });
  // get all valid sessions
  const sessions = await prisma.session.findMany({
    where: { userId, expiresAt: { gt: now } },
    orderBy: { createdAt: "desc" },
    select: { id: true, userAgent: true, createdAt: true },
  });

  return {
    sessions: sessions.map((session) => ({
      ...session,
      ...(session.id === currentSessionId && { isCurrent: true }),
    })),
  };
};

type DeleteSessionParams = {
  sessionId: string;
  userId: string;
};

export const deleteSession = async ({
  sessionId,
  userId,
}: DeleteSessionParams) => {
  const deletedSession = await prisma.session.delete({
    where: { id: sessionId, userId },
  });
  appAsserts(deleteSession, NOT_FOUND, "Session not found");

  return {
    session: deletedSession,
  };
};
