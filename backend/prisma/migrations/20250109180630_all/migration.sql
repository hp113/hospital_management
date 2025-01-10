-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('DELIVERED', 'PENDING');

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "diseases" TEXT NOT NULL,
    "allergies" TEXT NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "bedNumber" TEXT NOT NULL,
    "floorNumber" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "emergencyContact" TEXT NOT NULL,
    "additionalInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodPlan" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "morningMeal" TEXT NOT NULL,
    "eveningMeal" TEXT NOT NULL,
    "nightMeal" TEXT NOT NULL,
    "morningIngredients" TEXT NOT NULL,
    "eveningIngredients" TEXT NOT NULL,
    "nightIngredients" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pantry" (
    "id" SERIAL NOT NULL,
    "staffName" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "assignedTasks" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pantry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealPreparationStatus" (
    "id" SERIAL NOT NULL,
    "foodPlanId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "deliveryStatus" "DeliveryStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealPreparationStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FoodPlan" ADD CONSTRAINT "FoodPlan_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPreparationStatus" ADD CONSTRAINT "MealPreparationStatus_foodPlanId_fkey" FOREIGN KEY ("foodPlanId") REFERENCES "FoodPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
