/*
  Warnings:

  - Made the column `clubId` on table `Archer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Archer" DROP CONSTRAINT "Archer_clubId_fkey";

-- AlterTable
ALTER TABLE "Archer" ALTER COLUMN "clubId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ScoreWA" ADD COLUMN     "isBullseye" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Archer" ADD CONSTRAINT "Archer_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
