/*
  Warnings:

  - You are about to drop the `_PortfolioToTechincalSkill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PortfolioToTechincalSkill" DROP CONSTRAINT "_PortfolioToTechincalSkill_A_fkey";

-- DropForeignKey
ALTER TABLE "_PortfolioToTechincalSkill" DROP CONSTRAINT "_PortfolioToTechincalSkill_B_fkey";

-- DropTable
DROP TABLE "_PortfolioToTechincalSkill";

-- CreateTable
CREATE TABLE "PortfolioTechincalSkill" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "socialMediaId" TEXT NOT NULL,
    "techincalSkillId" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioTechincalSkill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PortfolioTechincalSkill" ADD CONSTRAINT "PortfolioTechincalSkill_techincalSkillId_fkey" FOREIGN KEY ("techincalSkillId") REFERENCES "TechincalSkill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioTechincalSkill" ADD CONSTRAINT "PortfolioTechincalSkill_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
