/*
  Warnings:

  - Added the required column `pantryId` to the `MealPreparationStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MealPreparationStatus" ADD COLUMN     "pantryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "MealPreparationStatus" ADD CONSTRAINT "MealPreparationStatus_pantryId_fkey" FOREIGN KEY ("pantryId") REFERENCES "Pantry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
