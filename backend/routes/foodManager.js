const { Router } = require("express");
const { createPatient, getPatients, getPatientbyId } = require("../controller/hospitalFoodManagement/patientController");
const { createPantry, assignTasks } = require("../controller/hospitalFoodManagement/pantryController");
const { updateMealStatus, getAllMealStatus, getMealStatusbyFoodPlanId } = require("../controller/hospitalFoodManagement/mealTrackingController");
const { createFoodPlan, getFoodPlans } = require("../controller/hospitalFoodManagement/foodPlanningController");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");

const managerRouter = Router();
managerRouter.use(verifyToken);
managerRouter.use(checkRole('MANAGER'));

managerRouter.post("/patients", createPatient);

managerRouter.get("/patients", getPatients);

managerRouter.get("/patients/:id", getPatientbyId);

managerRouter.post("/food-plan", createFoodPlan);

managerRouter.get("/food-plans", getFoodPlans);

managerRouter.post("/pantry", createPantry);

managerRouter.post("/assign-tasks", assignTasks);

managerRouter.put("/meal-status", updateMealStatus);

managerRouter.get("/meal-status", getAllMealStatus);

managerRouter.get("/meal-status/food-plan/:foodPlanId", getMealStatusbyFoodPlanId);


module.exports = {managerRouter};
