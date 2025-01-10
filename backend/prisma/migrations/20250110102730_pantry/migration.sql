/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Pantry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Pantry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pantry" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pantry_userId_key" ON "Pantry"("userId");

-- AddForeignKey
ALTER TABLE "Pantry" ADD CONSTRAINT "Pantry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
