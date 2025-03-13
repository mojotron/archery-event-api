/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Archer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Archer_username_key" ON "Archer"("username");
