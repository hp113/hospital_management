const { prisma } = require("../../prisma/prismaClient");

const createPantry = async(req, res) =>{
    const { staffName, contactInfo, location, userId } = req.body;

    try{
        const pantry = await prisma.pantry.create({
            data:{
                staffName,
                contactInfo,
                location,
                userId
            }
        });

        return res.status(200).json({message: 'pantry created successfully', pantry});
    }catch(err){
        console.log(err);
        return res.status(400).json({message:'Unable to create pantry'});
    }
}

const assignTasks = async (req, res) => {
    const { pantryId, patientId, foodPlanId, status, deliveryStatus, deliveryPersonnelId } = req.body;

    try {
        const task = await prisma.mealPreparationStatus.create({
            data: {
                foodPlanId: foodPlanId,   
                status: status,  
                patientId: patientId,        
                deliveryStatus: deliveryStatus, 
                pantryId: pantryId, 
                deliveryPersonnelId: deliveryPersonnelId,      
            }
        });

        return res.status(200).json({ message: 'Task assigned to meal preparation successfully', task });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'Unable to assign task to meal preparation' });
    }
};

module.exports = {createPantry, assignTasks};