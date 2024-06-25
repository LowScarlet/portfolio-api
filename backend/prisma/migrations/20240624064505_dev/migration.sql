/*
  Warnings:

  - You are about to drop the `_TeamPortfolio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TeamPortfolio" DROP CONSTRAINT "_TeamPortfolio_A_fkey";

-- DropForeignKey
ALTER TABLE "_TeamPortfolio" DROP CONSTRAINT "_TeamPortfolio_B_fkey";

-- DropTable
DROP TABLE "_TeamPortfolio";

-- CreateTable
CREATE TABLE "PortfolioContributor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioContributor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PortfolioContributor" ADD CONSTRAINT "PortfolioContributor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioContributor" ADD CONSTRAINT "PortfolioContributor_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
