// const {prisma, Prisma} = require('@prisma/client');

const { prisma } = require("../../prisma/prismaClient");


const createFoodPlan = async (req, res) =>{
    const { patientId, morningMeal, eveningMeal, nightMeal, morningIngredients, eveningIngredients, nightIngredients, instructions } = req.body;

    try{
        const newFoodPlan = await prisma.foodPlan.create({
            data:{
                patientId,
                morningMeal,
                eveningMeal,
                nightMeal,
                morningIngredients,
                eveningIngredients,
                nightIngredients,
                instructions,
            }
        });

        return res.status(200).json({message:'food plan successfully created', newFoodPlan});
    }catch(err){
        console.log(err);
        return res.status(400).json({message:'Unable to create food plan'});
    }
}


const getFoodPlans = async(req, res) =>{
    try{
        const foodPlans = await prisma.foodPlan.findMany();
        return res.status(200).json(foodPlans);
    }catch(err){
        console.log(err);
        return res.status(400).json({message:'Unable to fetch foodplans'});
    }
}

module.exports = {getFoodPlans, createFoodPlan};