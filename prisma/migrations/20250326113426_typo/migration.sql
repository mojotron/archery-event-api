/*
  Warnings:

  - You are about to drop the `Tournamnet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ScoreCard" DROP CONSTRAINT "ScoreCard_tournamnetId_fkey";

-- DropForeignKey
ALTER TABLE "Tournamnet" DROP CONSTRAINT "Tournamnet_organizedById_fkey";

-- DropForeignKey
ALTER TABLE "Tournamnet" DROP CONSTRAINT "Tournamnet_seasonId_fkey";

-- DropTable
DROP TABLE "Tournamnet";

-- CreateTable
CREATE TABLE "Tournament" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rules" "RulesType" NOT NULL,
    "title" TEXT NOT NULL,
    "attendAt" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,
    "organizedById" TEXT,
    "seasonId" TEXT,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_organizedById_fkey" FOREIGN KEY ("organizedById") REFERENCES "Club"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreCard" ADD CONSTRAINT "ScoreCard_tournamnetId_fkey" FOREIGN KEY ("tournamnetId") REFERENCES "Tournament"("id") ON DELETE SET NULL ON UPDATE CASCADE;
