import prisma from "../config/prisma.js";
import { INTERNAL_SERVER_ERROR } from "../constants/http.js";
import appAsserts from "../utils/appAssert.js";

type CreateTournamentParams = {
  seasonId: string;
  attendAt: string;
  title: string;
  description?: string;
  location: string;
  createdById: string;
  organizedBy: string;
};

export const createTournament = async (data: CreateTournamentParams) => {
  const newTournament = await prisma.tournament.create({ data: { ...data } });
  appAsserts(
    newTournament,
    INTERNAL_SERVER_ERROR,
    "unable to create new tournament"
  );
  return { tournament: newTournament };
};
