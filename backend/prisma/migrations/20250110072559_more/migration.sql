/*
  Warnings:

  - You are about to drop the column `assignedTasks` on the `Pantry` table. All the data in the column will be lost.
  - Changed the type of `status` on the `MealPreparationStatus` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MealStatus" AS ENUM ('PREPARED', 'IN_PROGRESS', 'PENDING');

-- AlterTable
ALTER TABLE "MealPreparationStatus" ADD COLUMN     "deliveryPersonnelId" INTEGER,
DROP COLUMN "status",
ADD COLUMN     "status" "MealStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Pantry" DROP COLUMN "assignedTasks";

-- CreateTable
CREATE TABLE "DeliveryPersonnel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "otherDetails" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryPersonnel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MealPreparationStatus" ADD CONSTRAINT "MealPreparationStatus_deliveryPersonnelId_fkey" FOREIGN KEY ("deliveryPersonnelId") REFERENCES "DeliveryPersonnel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
