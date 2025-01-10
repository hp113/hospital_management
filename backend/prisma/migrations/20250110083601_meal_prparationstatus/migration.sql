/*
  Warnings:

  - A unique constraint covering the columns `[foodPlanId,patientId,status]` on the table `MealPreparationStatus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `patientId` to the `MealPreparationStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MealPreparationStatus" ADD COLUMN     "patientId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MealPreparationStatus_foodPlanId_patientId_status_key" ON "MealPreparationStatus"("foodPlanId", "patientId", "status");

-- AddForeignKey
ALTER TABLE "MealPreparationStatus" ADD CONSTRAINT "MealPreparationStatus_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
