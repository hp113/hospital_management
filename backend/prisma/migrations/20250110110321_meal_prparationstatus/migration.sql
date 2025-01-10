/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `DeliveryPersonnel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `DeliveryPersonnel` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "DeliveryPersonnel" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryPersonnel_userId_key" ON "DeliveryPersonnel"("userId");

-- AddForeignKey
ALTER TABLE "DeliveryPersonnel" ADD CONSTRAINT "DeliveryPersonnel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
