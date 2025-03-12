-- CreateEnum
CREATE TYPE "VerivicationCodeType" AS ENUM ('EmailVerification', 'PasswordReset');

-- CreateEnum
CREATE TYPE "S3D_hit" AS ENUM ('miss', 'center', 'vital', 'body');

-- CreateEnum
CREATE TYPE "TargetSlope" AS ENUM ('eyelevel', 'uphill', 'downhill');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationCode" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "type" "VerivicationCodeType" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "VerificationCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Archer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clubId" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "Archer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Club" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoreScan3D" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "arrow" INTEGER NOT NULL,
    "hit" "S3D_hit" NOT NULL,
    "scoreCardId" TEXT NOT NULL,
    "animalId" TEXT,

    CONSTRAINT "ScoreScan3D_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimalTarget" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "distance" INTEGER NOT NULL,
    "slope" "TargetSlope" NOT NULL,

    CONSTRAINT "AnimalTarget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoreWA" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "first" INTEGER NOT NULL,
    "second" INTEGER NOT NULL,
    "third" INTEGER NOT NULL,
    "axesX" INTEGER,
    "axesY" INTEGER,
    "scoreCardId" TEXT,
    "targetId" TEXT,

    CONSTRAINT "ScoreWA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaceTarget" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "distance" INTEGER NOT NULL,

    CONSTRAINT "FaceTarget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoreCardScan3D" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archerId" TEXT NOT NULL,

    CONSTRAINT "ScoreCardScan3D_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoreCardWA" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archerId" TEXT NOT NULL,

    CONSTRAINT "ScoreCardWA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamnetScan3D" (
    "id" TEXT NOT NULL,

    CONSTRAINT "TournamnetScan3D_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentWA" (
    "id" TEXT NOT NULL,

    CONSTRAINT "TournamentWA_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Archer_email_key" ON "Archer"("email");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationCode" ADD CONSTRAINT "VerificationCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Archer" ADD CONSTRAINT "Archer_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreScan3D" ADD CONSTRAINT "ScoreScan3D_scoreCardId_fkey" FOREIGN KEY ("scoreCardId") REFERENCES "ScoreCardScan3D"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreScan3D" ADD CONSTRAINT "ScoreScan3D_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "AnimalTarget"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreWA" ADD CONSTRAINT "ScoreWA_scoreCardId_fkey" FOREIGN KEY ("scoreCardId") REFERENCES "ScoreCardWA"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreWA" ADD CONSTRAINT "ScoreWA_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "FaceTarget"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreCardScan3D" ADD CONSTRAINT "ScoreCardScan3D_archerId_fkey" FOREIGN KEY ("archerId") REFERENCES "Archer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreCardWA" ADD CONSTRAINT "ScoreCardWA_archerId_fkey" FOREIGN KEY ("archerId") REFERENCES "Archer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
