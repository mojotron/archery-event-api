-- AlterTable
ALTER TABLE "SeasonScan3D" ADD COLUMN     "isFinished" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SeasonWA" ADD COLUMN     "isFinished" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TournamentWA" ADD COLUMN     "isFinished" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TournamnetScan3D" ADD COLUMN     "isFinished" BOOLEAN NOT NULL DEFAULT false;
