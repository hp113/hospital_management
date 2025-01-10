const { prisma } = require("../../prisma/prismaClient");

const updateMealStatus = async(req, res) =>{
    try{
        const {mealId,status, deliveryStatus} = req.body;
        if(!(status && deliveryStatus)){
            return res.status(400).json({message:'Missing required fields'});
        }
        
        console.log(mealId+'\n'+status+'\n'+deliveryStatus);
        const mealStatus = await prisma.mealPreparationStatus.update({
            where: {
                id: parseInt(mealId)
            }, 
            data:{
                status: status,
                deliveryStatus: deliveryStatus
            }
        });

        return res.status(200).json({message: 'meal status updated', mealStatus});
    }catch(err){
        console.log(err);
        return res.status(400).json({message:'Failed to update meal status'});
    }
};

const getAllMealStatus = async(req, res) =>{
    try{
        const mealStatus = await prisma.mealPreparationStatus.findMany({
            include:{
                foodPlan:true
            }
        });

        return res.status(200).json({message:'status retrieved', mealStatus});
    }catch(err){
        console.log(err);
        return res.status(400).json({message:'failed to retrieve meal status'});
    }
}

const getMealStatusbyFoodPlanId = async(req, res) =>{
    const {foodPlanId} = req.params;

    try{
        const mealStatus = await prisma.mealPreparationStatus.findUnique({
            where:{
                foodPlanId:Number(foodPlanId)
            },
            include:{
                foodPlan:true
            }
        });

        if(!mealStatus){
            return res.status(400).json({message:'no meal status found with this id'});
        }

        return res.status(200).json({message:'status retrieved', mealStatus});
    }catch(err){
        console.log(err);
        return res.status(400).json({message:'failed to retrieve meal status with given id'});
    }
}

module.exports ={getAllMealStatus, getMealStatusbyFoodPlanId, updateMealStatus};