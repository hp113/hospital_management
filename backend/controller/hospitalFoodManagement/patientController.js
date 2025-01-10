// const {prisma}  = require('@prisma/client');

const { prisma } = require("../../prisma/prismaClient");

const createPatient = async (req, res) =>{
    const {name, diseases, allergies, roomNumber, bedNumber, floorNumber, age, gender, contactInfo, emergencyContact, additionalInfo} = req.body;
    const patientAge = parseInt(age);
    try{
        const newPatient = await prisma.patient.create({
            data:{
                name,
                diseases,
                allergies,
                roomNumber,
                bedNumber,
                floorNumber,
                age:patientAge,
                gender,
                contactInfo,
                emergencyContact,
                additionalInfo
            }
        });

        return res.status(200).json({message:'Patient details added successfully', newPatient});
    }catch(err){
        console.log(err);
        return res.status(400).json({message:"Failed to create patient"});
    }
};

const getPatients= async(req, res) =>{
    try{
        const patients = await prisma.patient.findMany();
        return res.status(200).json(patients);
    }catch(err){
        console.log(err);
        return res.status(400).json({message:'Failed to fetch patient details'});
    }
};

const getPatientbyId = async(req, res) =>{
    const {id} = req.params;

    try{
        const patient = await prisma.patient.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!patient) {
            return res.status(400).json({ message: 'Patient not found' });
        }

        return res.status(200).json(patient);
    }catch(err){
        console.log(err);
        return res.status(400).json({message: `Could not fetch patient with id ${id}`});
    }
}

module.exports = {getPatientbyId, getPatients, createPatient};