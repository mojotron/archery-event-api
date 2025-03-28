/*
  Warnings:

  - You are about to drop the column `scoreCardId` on the `Score3D` table. All the data in the column will be lost.
  - You are about to drop the column `scoreCardId` on the `ScoreWA` table. All the data in the column will be lost.
  - You are about to drop the `ScoreCard` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `scorecardId` to the `Score3D` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scorecardId` to the `ScoreWA` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Score3D" DROP CONSTRAINT "Score3D_scoreCardId_fkey";

-- DropForeignKey
ALTER TABLE "ScoreCard" DROP CONSTRAINT "ScoreCard_archerId_fkey";

-- DropForeignKey
ALTER TABLE "ScoreCard" DROP CONSTRAINT "ScoreCard_tournamentId_fkey";

-- DropForeignKey
ALTER TABLE "ScoreWA" DROP CONSTRAINT "ScoreWA_scoreCardId_fkey";

-- AlterTable
ALTER TABLE "Score3D" DROP COLUMN "scoreCardId",
ADD COLUMN     "scorecardId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ScoreWA" DROP COLUMN "scoreCardId",
ADD COLUMN     "scorecardId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ScoreCard";

-- CreateTable
CREATE TABLE "Scorecard" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rules" "RulesType" NOT NULL,
    "archerId" TEXT,
    "tournamentId" TEXT,

    CONSTRAINT "Scorecard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Scorecard" ADD CONSTRAINT "Scorecard_archerId_fkey" FOREIGN KEY ("archerId") REFERENCES "Archer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scorecard" ADD CONSTRAINT "Scorecard_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score3D" ADD CONSTRAINT "Score3D_scorecardId_fkey" FOREIGN KEY ("scorecardId") REFERENCES "Scorecard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreWA" ADD CONSTRAINT "ScoreWA_scorecardId_fkey" FOREIGN KEY ("scorecardId") REFERENCES "Scorecard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
