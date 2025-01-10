const jwt = require("jsonwebtoken");
const { prisma } = require("../../prisma/prismaClient")

const getPreparationTasks = async (req, res) =>{

    const userId = req.user.id;
    const {pantryId} = await prisma.pantry.findUnique({
        where:{
            userId:userId
        }
    })

    // console.log(pantryId);

    try{
        const tasks = await prisma.mealPreparationStatus.findMany({
            where:{
                pantryId: pantryId,
            },
            include:{
                foodPlan: true
            }
        });
        return res.status(200).json(tasks);
    }catch(err){
        console.log(err);
        return res.status(400).json({mesage:'Failed to fetch preparation tasks'});
    }
};

const updatePreparationStatus = async(req, res) =>{
    const {mealId, status } = req.body;
    
    try{
        updatedTask = await prisma.mealPreparationStatus.update({
            where:{
                id: mealId,
            },
            data: {status}
        });
        
        return res.status(200).json(updatedTask);
    }catch(err){
        console.log(err);
        return res.status(400).json({mesage:'Failed to update preparation tasks'});
    }
}

module.exports = {getPreparationTasks, updatePreparationStatus};