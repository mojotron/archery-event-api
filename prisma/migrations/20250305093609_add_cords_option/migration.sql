-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "locationCoordsId" TEXT;

-- CreateTable
CREATE TABLE "LocationCoords" (
    "id" TEXT NOT NULL,
    "lonitude" INTEGER NOT NULL,
    "latitude" INTEGER NOT NULL,

    CONSTRAINT "LocationCoords_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_locationCoordsId_fkey" FOREIGN KEY ("locationCoordsId") REFERENCES "LocationCoords"("id") ON DELETE SET NULL ON UPDATE CASCADE;
