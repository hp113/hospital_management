const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../prisma/prismaClient');


const register = async( req, res) =>{
    const {email, password, role} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try{
        const user = await prisma.user.create({
            data:{
                email,
                password: hashedPassword,
                role
            }
        })

        res.status(201).json(user);
    }catch(error){
        res.status(400).json({error: error});
    }
};

const login = async (req, res) =>{
    const {email, password} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {email}
        })
    
        if(!user){
            return res.status(404).json({error:'User not found'});
        }
    
        console.log(`Password entered by user = ${password} \n`);
        console.log(`Password in DB = ${user.password}`);
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.status(400).json({error: 'invalid password'});
        }
    
        const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '3h'});
        return res.status(200).json({message:"User logged in successfully", token});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server error"});
    }

}

module.exports = {register, login};