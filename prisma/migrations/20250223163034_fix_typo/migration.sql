/*
  Warnings:

  - You are about to drop the column `turnamentCount` on the `Season` table. All the data in the column will be lost.
  - You are about to drop the `Turnament` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tournamentCount` to the `Season` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Turnament" DROP CONSTRAINT "Turnament_seasonId_fkey";

-- AlterTable
ALTER TABLE "Season" DROP COLUMN "turnamentCount",
ADD COLUMN     "tournamentCount" INTEGER NOT NULL,
ALTER COLUMN "isFinished" SET DEFAULT false;

-- DropTable
DROP TABLE "Turnament";

-- CreateTable
CREATE TABLE "Tournament" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
