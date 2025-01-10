const { DeliveryStatus } = require("@prisma/client");
const { prisma } = require("../../prisma/prismaClient");

const addDeliveryPersonnel = async(req, res) =>{
    const {name, contactInfo, otherDetails, userId}  = req.body;

    try{
        const newPersonnel = await prisma.deliveryPersonnel.create({
            data:{
                name,
                contactInfo,
                otherDetails,
                userId
            }
        });

        return res.status(200).json({message:'Delivery personnel created successfully'});
    }catch(err){
        console.log(err);
        return res.status(400).json({message:'failed to create delivery personnel'});
    }
};

const assignMealBoxToDelivery = async (req,res) =>{
    const {personnelId, mealBoxId} = req.body;

    try{
        const updatedBox = await prisma.mealPreparationStatus.update({
            where:{
                id:parseInt(mealBoxId)
            },
            data:{
                deliveryPersonnelId: parseInt(personnelId)
            }
        });

        return res.status(200).json(updatedBox);
    }catch(err){
         console.log(err);
         return res.status(400).json({message:'failed to assign meal box'});
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

module.exports = {addDeliveryPersonnel, assignMealBoxToDelivery, markMealAsDelivered};

