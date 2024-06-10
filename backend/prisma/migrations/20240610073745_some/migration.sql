-- CreateEnum
CREATE TYPE "DegreeLevel" AS ENUM ('BACHELOR', 'MAGISTER', 'DOCTORAL');

-- AlterTable
ALTER TABLE "PortfolioEducation" ADD COLUMN     "degreeLevel" "DegreeLevel";
