const { Router } = require("express");
const { getAssignedMealBoxes, markMealAsDelivered } = require("../controller/delivery/deliveryController");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");

const deliveryRouter = Router();
deliveryRouter.use(verifyToken);
deliveryRouter.use(checkRole('DELIVERY'));

deliveryRouter.get("/assigned-meal-boxes", getAssignedMealBoxes);

deliveryRouter.put("/mark-delivered/:mealBoxId", markMealAsDelivered);

module.exports = {deliveryRouter};