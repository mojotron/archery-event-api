/*
  Warnings:

  - You are about to drop the column `isBullseye` on the `ScoreWA` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AnimalHitWA" AS ENUM ('bullseye', 'center', 'vital', 'body', 'miss');

-- AlterTable
ALTER TABLE "ScoreWA" DROP COLUMN "isBullseye";

-- CreateTable
CREATE TABLE "ScoreWA3D" (
    "id" TEXT NOT NULL,
    "first" "AnimalHitWA" NOT NULL,
    "second" "AnimalHitWA" NOT NULL,
    "scorecardId" TEXT NOT NULL,

    CONSTRAINT "ScoreWA3D_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScoreWA3D" ADD CONSTRAINT "ScoreWA3D_scorecardId_fkey" FOREIGN KEY ("scorecardId") REFERENCES "Scorecard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
