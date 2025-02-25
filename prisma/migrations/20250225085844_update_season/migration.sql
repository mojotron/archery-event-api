/*
  Warnings:

  - You are about to drop the column `userId` on the `Season` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Season` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_userId_fkey";

-- AlterTable
ALTER TABLE "Season" DROP COLUMN "userId",
ADD COLUMN     "createdById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
