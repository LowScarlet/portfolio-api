/*
  Warnings:

  - The primary key for the `SocialMedia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TechincalSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "PortfolioConnect" DROP CONSTRAINT "PortfolioConnect_socialMediaId_fkey";

-- DropForeignKey
ALTER TABLE "_PortfolioToTechincalSkill" DROP CONSTRAINT "_PortfolioToTechincalSkill_B_fkey";

-- AlterTable
ALTER TABLE "PortfolioConnect" ALTER COLUMN "socialMediaId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "SocialMedia" DROP CONSTRAINT "SocialMedia_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SocialMedia_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SocialMedia_id_seq";

-- AlterTable
ALTER TABLE "TechincalSkill" DROP CONSTRAINT "TechincalSkill_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TechincalSkill_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TechincalSkill_id_seq";

-- AlterTable
ALTER TABLE "_PortfolioToTechincalSkill" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "PortfolioConnect" ADD CONSTRAINT "PortfolioConnect_socialMediaId_fkey" FOREIGN KEY ("socialMediaId") REFERENCES "SocialMedia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PortfolioToTechincalSkill" ADD CONSTRAINT "_PortfolioToTechincalSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "TechincalSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
