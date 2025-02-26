/*
  Warnings:

  - The values [skandinavian_3D] on the enum `SeasonType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SeasonType_new" AS ENUM ('scandinavian_3D');
ALTER TABLE "Season" ALTER COLUMN "type" TYPE "SeasonType_new" USING ("type"::text::"SeasonType_new");
ALTER TYPE "SeasonType" RENAME TO "SeasonType_old";
ALTER TYPE "SeasonType_new" RENAME TO "SeasonType";
DROP TYPE "SeasonType_old";
COMMIT;
