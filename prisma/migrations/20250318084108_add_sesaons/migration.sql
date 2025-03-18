/*
  Warnings:

  - Added the required column `address` to the `TournamnetScan3D` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attendAt` to the `TournamnetScan3D` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `TournamnetScan3D` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `TournamnetScan3D` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TournamnetScan3D` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ScoreCardScan3D" ADD COLUMN     "tournamentId" TEXT;

-- AlterTable
ALTER TABLE "TournamentWA" ADD COLUMN     "seasonId" TEXT;

-- AlterTable
ALTER TABLE "TournamnetScan3D" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "attendAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "clubId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "seasonId" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "SeasonScan3D" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tournamentCount" INTEGER NOT NULL,

    CONSTRAINT "SeasonScan3D_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeasonWA" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tournamentCount" INTEGER NOT NULL,
    "distance" INTEGER NOT NULL,

    CONSTRAINT "SeasonWA_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScoreCardScan3D" ADD CONSTRAINT "ScoreCardScan3D_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "TournamnetScan3D"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamnetScan3D" ADD CONSTRAINT "TournamnetScan3D_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamnetScan3D" ADD CONSTRAINT "TournamnetScan3D_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "SeasonScan3D"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentWA" ADD CONSTRAINT "TournamentWA_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "SeasonWA"("id") ON DELETE SET NULL ON UPDATE CASCADE;
