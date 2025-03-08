import prisma from "../config/prisma.js";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../constants/http.js";
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

export const getTournament = async (tournamentId: string) => {
  const tournament = await prisma.tournament.findUnique({
    where: { id: tournamentId },
    include: { season: { select: { type: true } } },
  });
  appAsserts(tournament, NOT_FOUND, "tournament not found");
  return { tournament };
};

export const deleteTournament = async (
  tournamentId: string,
  createdById: string
) => {
  const deletedTournament = await prisma.tournament.delete({
    where: { id: tournamentId, createdById },
  });
  appAsserts(
    deletedTournament,
    INTERNAL_SERVER_ERROR,
    "tournament deletion failed"
  );

  return { tournament: deletedTournament };
};

type UpdateTournamentTypes = {
  tournamentId: string;
  createdById: string;
  title?: string;
  description?: string;
  location?: string;
  attendAt?: string;
  isFinished?: boolean;
};

export const updateTournament = async (data: UpdateTournamentTypes) => {
  const tournament = await prisma.tournament.findUnique({
    where: { id: data.tournamentId, createdById: data.createdById },
  });
  appAsserts(tournament, NOT_FOUND, "tournament not found");

  const updatedTournament = await prisma.tournament.update({
    where: { id: tournament.id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.location !== undefined && { location: data.location }),
      ...(data.attendAt !== undefined && { attendAt: data.attendAt }),
      ...(data.isFinished !== undefined && { isFinished: data.isFinished }),
    },
  });
  appAsserts(
    updatedTournament,
    INTERNAL_SERVER_ERROR,
    "unable to update tournament"
  );

  return { tournament: updatedTournament };
};
