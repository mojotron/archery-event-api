/*
  Warnings:

  - Added the required column `rules` to the `ScoreCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ScoreCard" ADD COLUMN     "rules" "RulesType" NOT NULL;

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "rounds" INTEGER NOT NULL DEFAULT 20;
