/*
  Warnings:

  - You are about to drop the column `porfolioId` on the `PortfolioProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[portfolioId]` on the table `PortfolioProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `portfolioId` to the `PortfolioProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PortfolioProfile" DROP CONSTRAINT "PortfolioProfile_porfolioId_fkey";

-- DropIndex
DROP INDEX "PortfolioProfile_porfolioId_key";

-- AlterTable
ALTER TABLE "PortfolioProfile" DROP COLUMN "porfolioId",
ADD COLUMN     "portfolioId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SocialMedia" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TechincalSkill" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioProfile_portfolioId_key" ON "PortfolioProfile"("portfolioId");

-- AddForeignKey
ALTER TABLE "PortfolioProfile" ADD CONSTRAINT "PortfolioProfile_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
