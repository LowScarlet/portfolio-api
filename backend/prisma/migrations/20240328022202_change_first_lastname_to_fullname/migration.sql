/*
  Warnings:

  - You are about to drop the column `firstName` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `UserProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "fullName" TEXT;
