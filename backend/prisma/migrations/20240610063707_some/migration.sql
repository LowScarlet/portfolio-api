-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_degreeId_fkey";

-- AlterTable
ALTER TABLE "Department" ALTER COLUMN "degreeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_degreeId_fkey" FOREIGN KEY ("degreeId") REFERENCES "Degree"("id") ON DELETE SET NULL ON UPDATE CASCADE;
