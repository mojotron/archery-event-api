/*
  Warnings:

  - You are about to drop the column `tournamnetId` on the `ScoreCard` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ScoreCard" DROP CONSTRAINT "ScoreCard_tournamnetId_fkey";

-- AlterTable
ALTER TABLE "ScoreCard" DROP COLUMN "tournamnetId",
ADD COLUMN     "tournamentId" TEXT;

-- AddForeignKey
ALTER TABLE "ScoreCard" ADD CONSTRAINT "ScoreCard_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE SET NULL ON UPDATE CASCADE;
