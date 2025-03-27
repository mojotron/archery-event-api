/*
  Warnings:

  - You are about to drop the column `scoreId` on the `Score3D` table. All the data in the column will be lost.
  - You are about to drop the column `scoreId` on the `ScoreWA` table. All the data in the column will be lost.
  - You are about to drop the `Score` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `scoreCardId` to the `Score3D` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scoreCardId` to the `ScoreWA` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_scoreCardId_fkey";

-- DropForeignKey
ALTER TABLE "Score3D" DROP CONSTRAINT "Score3D_scoreId_fkey";

-- DropForeignKey
ALTER TABLE "ScoreWA" DROP CONSTRAINT "ScoreWA_scoreId_fkey";

-- DropIndex
DROP INDEX "Score3D_scoreId_key";

-- DropIndex
DROP INDEX "ScoreWA_scoreId_key";

-- AlterTable
ALTER TABLE "Score3D" DROP COLUMN "scoreId",
ADD COLUMN     "scoreCardId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ScoreWA" DROP COLUMN "scoreId",
ADD COLUMN     "scoreCardId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Score";

-- AddForeignKey
ALTER TABLE "Score3D" ADD CONSTRAINT "Score3D_scoreCardId_fkey" FOREIGN KEY ("scoreCardId") REFERENCES "ScoreCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreWA" ADD CONSTRAINT "ScoreWA_scoreCardId_fkey" FOREIGN KEY ("scoreCardId") REFERENCES "ScoreCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
