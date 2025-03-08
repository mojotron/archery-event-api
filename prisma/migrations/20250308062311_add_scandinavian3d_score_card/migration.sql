/*
  Warnings:

  - You are about to drop the `Score` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScoreCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Target` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TargetScandinavian3DHit" AS ENUM ('miss', 'center', 'vital', 'body');

-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_targetId_fkey";

-- DropForeignKey
ALTER TABLE "ScoreCard" DROP CONSTRAINT "ScoreCard_tournamentId_fkey";

-- DropTable
DROP TABLE "Score";

-- DropTable
DROP TABLE "ScoreCard";

-- DropTable
DROP TABLE "Target";

-- CreateTable
CREATE TABLE "ScoreCardScaninavian3D" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ScoreCardScaninavian3D_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TargetScandinavian3D" (
    "id" TEXT NOT NULL,
    "arrow" INTEGER NOT NULL,
    "hit" "TargetScandinavian3DHit" NOT NULL,
    "scoreCardId" TEXT NOT NULL,

    CONSTRAINT "TargetScandinavian3D_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScoreCardScaninavian3D" ADD CONSTRAINT "ScoreCardScaninavian3D_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreCardScaninavian3D" ADD CONSTRAINT "ScoreCardScaninavian3D_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TargetScandinavian3D" ADD CONSTRAINT "TargetScandinavian3D_scoreCardId_fkey" FOREIGN KEY ("scoreCardId") REFERENCES "ScoreCardScaninavian3D"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
