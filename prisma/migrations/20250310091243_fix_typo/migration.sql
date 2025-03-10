/*
  Warnings:

  - You are about to drop the `ScoreCardScaninavian3D` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ScoreCardScaninavian3D" DROP CONSTRAINT "ScoreCardScaninavian3D_tournamentId_fkey";

-- DropForeignKey
ALTER TABLE "ScoreCardScaninavian3D" DROP CONSTRAINT "ScoreCardScaninavian3D_userId_fkey";

-- DropForeignKey
ALTER TABLE "ScoreScandinavian3D" DROP CONSTRAINT "ScoreScandinavian3D_scoreCardId_fkey";

-- DropTable
DROP TABLE "ScoreCardScaninavian3D";

-- CreateTable
CREATE TABLE "ScoreCardScandinavian3D" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ScoreCardScandinavian3D_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScoreCardScandinavian3D" ADD CONSTRAINT "ScoreCardScandinavian3D_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreCardScandinavian3D" ADD CONSTRAINT "ScoreCardScandinavian3D_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreScandinavian3D" ADD CONSTRAINT "ScoreScandinavian3D_scoreCardId_fkey" FOREIGN KEY ("scoreCardId") REFERENCES "ScoreCardScandinavian3D"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
