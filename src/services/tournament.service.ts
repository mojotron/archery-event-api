import { RulesType } from "@prisma/client";
import prisma from "../config/prisma.js";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../constants/http.js";
import appAsserts from "../utils/appAssert.js";
import { StatusEnum } from "../controllers/general.schema.js";

// CREATE
type CreateTournamentParams = {
  seasonId?: string;
  organizedById?: string;
  rules: RulesType;
  title: string;
  attendAt: string;
  description: string;
  address: string;
};
export const createTournament = async (data: CreateTournamentParams) => {
  const tournament = await prisma.tournament.create({ data: { ...data } });
  appAsserts(
    tournament,
    INTERNAL_SERVER_ERROR,
    "unable to create new tournament"
  );
  return { tournament };
};

// READ
type GetTournamentsParams = {
  seasonFilter?: string;
  clubFilter?: string;
  statusFilter?: StatusEnum;
};
export const getTournamentList = async ({
  seasonFilter = undefined,
  clubFilter = undefined,
  statusFilter = undefined,
}: GetTournamentsParams) => {
  const tournaments = await prisma.tournament.findMany({
    where: {
      ...(seasonFilter && { seasonId: seasonFilter }),
      ...(clubFilter && { organizedById: clubFilter }),
      ...(statusFilter === "finished" && { isFinished: true }),
    },
  });
  return { tournaments };
};

export const getTournament = async (tournamentId: string) => {
  const tournament = await prisma.tournament.findUnique({
    where: { id: tournamentId },
  });
  appAsserts(tournament, NOT_FOUND, "tournament not found");
  return { tournament };
};

// UPDATE
type UpdateTournamentTypes = {
  tournamentId: string;
  seasonId?: string;
  organizedById?: string;
  rules?: RulesType;
  title?: string;
  description?: string;
  attendAt?: string;
  address?: string;
  isFinished?: boolean;
};
export const updateTournament = async (data: UpdateTournamentTypes) => {
  const tournament = await prisma.tournament.findUnique({
    where: { id: data.tournamentId },
  });
  appAsserts(tournament, NOT_FOUND, "tournament not found");

  const updatedTournament = await prisma.tournament.update({
    where: { id: tournament.id },
    data: {
      ...(tournament.rules && { rules: data.rules }),
      ...(tournament.attendAt && { attendAt: data.attendAt }),
      ...(tournament.title && { title: data.title }),
      ...(tournament.description && { description: data.description }),
      ...(tournament.address && { address: data.address }),
      ...(tournament.isFinished && { isFinished: data.isFinished }),
      ...(tournament.seasonId && { seasonId: data.seasonId }),
      ...(tournament.organizedById && { organizedById: data.organizedById }),
    },
  });
  appAsserts(
    updatedTournament,
    INTERNAL_SERVER_ERROR,
    "failed to update tournament"
  );

  return { tournament: updatedTournament };
};

// DELETE
export const deleteTournament = async (tournamentId: string) => {
  const tournament = await prisma.tournament.findUnique({
    where: { id: tournamentId },
    include: { _count: { select: { scorecards: true } } },
  });
  appAsserts(tournament, NOT_FOUND, "tournament not found");
  appAsserts(
    tournament._count.scorecards === 0,
    BAD_REQUEST,
    "unable to delete tournament, has scorecards"
  );

  const deletedTournament = await prisma.tournament.delete({
    where: { id: tournament.id },
  });
  appAsserts(
    deletedTournament,
    INTERNAL_SERVER_ERROR,
    "failed to delete tournament"
  );

  return { tournament: deletedTournament };
};
