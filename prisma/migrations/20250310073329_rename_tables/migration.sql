/*
  Warnings:

  - You are about to drop the `TargetScandinavian3D` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ScoreScandinavian3DHit" AS ENUM ('miss', 'center', 'vital', 'body');

-- DropForeignKey
ALTER TABLE "TargetScandinavian3D" DROP CONSTRAINT "TargetScandinavian3D_scoreCardId_fkey";

-- DropTable
DROP TABLE "TargetScandinavian3D";

-- DropEnum
DROP TYPE "TargetScandinavian3DHit";

-- CreateTable
CREATE TABLE "ScoreScandinavian3D" (
    "id" TEXT NOT NULL,
    "arrow" INTEGER NOT NULL,
    "hit" "ScoreScandinavian3DHit" NOT NULL,
    "scoreCardId" TEXT NOT NULL,

    CONSTRAINT "ScoreScandinavian3D_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScoreScandinavian3D" ADD CONSTRAINT "ScoreScandinavian3D_scoreCardId_fkey" FOREIGN KEY ("scoreCardId") REFERENCES "ScoreCardScaninavian3D"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
