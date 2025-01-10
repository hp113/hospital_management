const { Router } = require("express");
const { addDeliveryPersonnel, assignedMealBox, markMealAsDelivered, assignMealBoxToDelivery } = require("../controller/pantry/deliveryPersonnelcontroller");
const { getPreparationTasks, updatePreparationStatus } = require("../controller/pantry/foodPreparationController");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");

const pantryRouter = Router();
pantryRouter.use(verifyToken);
pantryRouter.use(checkRole('PANTRY'));

pantryRouter.get("/", getPreparationTasks);

pantryRouter.post("/add-delivery-personnel", addDeliveryPersonnel);

pantryRouter.post("/assign-to-delivery", assignMealBoxToDelivery);

pantryRouter.put("/mark-delivered/:mealBoxId", markMealAsDelivered);


pantryRouter.put("/update-preparation-status", updatePreparationStatus);

module.exports = {pantryRouter};