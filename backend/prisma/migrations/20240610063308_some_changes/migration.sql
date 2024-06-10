/*
  Warnings:

  - The primary key for the `Institution` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PortfolioEducation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `socialMediaId` on the `PortfolioTechincalSkill` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Institution` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `portfolioId` to the `PortfolioEducation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PortfolioEducation" DROP CONSTRAINT "PortfolioEducation_institutionId_fkey";

-- DropForeignKey
ALTER TABLE "PortfolioTechincalSkill" DROP CONSTRAINT "PortfolioTechincalSkill_portfolioId_fkey";

-- AlterTable
ALTER TABLE "Institution" DROP CONSTRAINT "Institution_pkey",
ADD COLUMN     "maxScore" DOUBLE PRECISION NOT NULL DEFAULT 4.0,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "website" DROP NOT NULL,
ADD CONSTRAINT "Institution_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Institution_id_seq";

-- AlterTable
ALTER TABLE "PortfolioEducation" DROP CONSTRAINT "PortfolioEducation_pkey",
ADD COLUMN     "departmentId" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "dissertationTitle" TEXT,
ADD COLUMN     "endAt" TIMESTAMP(3),
ADD COLUMN     "portfolioId" TEXT NOT NULL,
ADD COLUMN     "startAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "score" DROP NOT NULL,
ALTER COLUMN "institutionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PortfolioEducation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PortfolioEducation_id_seq";

-- AlterTable
ALTER TABLE "PortfolioTechincalSkill" DROP COLUMN "socialMediaId";

-- AlterTable
ALTER TABLE "TechincalSkill" ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "degreeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Degree" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Degree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioWork" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "score" DOUBLE PRECISION,
    "dissertationTitle" TEXT,
    "startAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endAt" TIMESTAMP(3),
    "departmentId" TEXT,
    "institutionId" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioWork_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Degree_name_key" ON "Degree"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Institution_name_key" ON "Institution"("name");

-- AddForeignKey
ALTER TABLE "PortfolioTechincalSkill" ADD CONSTRAINT "PortfolioTechincalSkill_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_degreeId_fkey" FOREIGN KEY ("degreeId") REFERENCES "Degree"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioEducation" ADD CONSTRAINT "PortfolioEducation_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioEducation" ADD CONSTRAINT "PortfolioEducation_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioEducation" ADD CONSTRAINT "PortfolioEducation_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
