const { prisma } = require("../../prisma/prismaClient");

const getAssignedMealBoxes = async(req, res) =>{
    const userId = req.user.id;
    const personnelId = await prisma.deliveryPersonnel.findUnique({
        where:{
            userId:userId
        }
    })

    try{
        const assignedMeals = await prisma.mealPreparationStatus.findMany({
            where:{
                deliveryPersonnelId:personnelId.id,
            },
            include:{
                foodPlan:true
            }
        });

        return res.status(200).json(assignedMeals);
    }catch(err){
        console.log(err);
        return res.status(400).json({mesage:'unable to fetch assigned meals'});
    }
}

const markMealAsDelivered = async(req, res) =>{
    const {mealBoxId} = req.params;
    try{
        const updatedBox = await prisma.mealPreparationStatus.update({
            where:{
                id:parseInt(mealBoxId)
            },
            data:{
                deliveryStatus: 'DELIVERED'
            }
        });

        return res.status(200).json(updatedBox)
    }catch(err){
        console.log(err);
        return res.status(400).json({message:'unable to mark meal as delivered'});
    }
};

module.exports = {getAssignedMealBoxes, markMealAsDelivered}