/*
  Warnings:

  - The values [sacandinavian3D] on the enum `RulesType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RulesType_new" AS ENUM ('scandinavian3D', 'worldArchery', 'worldArchery3D');
ALTER TABLE "Season" ALTER COLUMN "rules" TYPE "RulesType_new" USING ("rules"::text::"RulesType_new");
ALTER TABLE "Tournamnet" ALTER COLUMN "rules" TYPE "RulesType_new" USING ("rules"::text::"RulesType_new");
ALTER TYPE "RulesType" RENAME TO "RulesType_old";
ALTER TYPE "RulesType_new" RENAME TO "RulesType";
DROP TYPE "RulesType_old";
COMMIT;
