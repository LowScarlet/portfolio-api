/*
  Warnings:

  - You are about to drop the column `about` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `banner` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Portfolio` table. All the data in the column will be lost.
  - Made the column `name` on table `Portfolio` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "about",
DROP COLUMN "banner",
DROP COLUMN "country",
DROP COLUMN "desc",
DROP COLUMN "email",
DROP COLUMN "image",
DROP COLUMN "label",
DROP COLUMN "nickname",
DROP COLUMN "phone",
DROP COLUMN "title",
DROP COLUMN "website",
ADD COLUMN     "description" TEXT,
ALTER COLUMN "isPublic" SET DEFAULT true,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "PortfolioProfile" (
    "id" TEXT NOT NULL,
    "logo" TEXT,
    "banner" TEXT,
    "fullName" TEXT,
    "label" TEXT,
    "nickname" TEXT,
    "about" TEXT,
    "country" TEXT,
    "email" TEXT[],
    "phone" TEXT[],
    "website" TEXT[],
    "porfolioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialMedia" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioConnect" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "socialMediaId" INTEGER NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioConnect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioTechincalSkill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioTechincalSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PortfolioToPortfolioTechincalSkill" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioProfile_porfolioId_key" ON "PortfolioProfile"("porfolioId");

-- CreateIndex
CREATE UNIQUE INDEX "_PortfolioToPortfolioTechincalSkill_AB_unique" ON "_PortfolioToPortfolioTechincalSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_PortfolioToPortfolioTechincalSkill_B_index" ON "_PortfolioToPortfolioTechincalSkill"("B");

-- AddForeignKey
ALTER TABLE "PortfolioProfile" ADD CONSTRAINT "PortfolioProfile_porfolioId_fkey" FOREIGN KEY ("porfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioConnect" ADD CONSTRAINT "PortfolioConnect_socialMediaId_fkey" FOREIGN KEY ("socialMediaId") REFERENCES "SocialMedia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioConnect" ADD CONSTRAINT "PortfolioConnect_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PortfolioToPortfolioTechincalSkill" ADD CONSTRAINT "_PortfolioToPortfolioTechincalSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PortfolioToPortfolioTechincalSkill" ADD CONSTRAINT "_PortfolioToPortfolioTechincalSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "PortfolioTechincalSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
