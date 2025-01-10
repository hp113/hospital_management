const express = require("express");
const  { login, register } =require( "../controller/authController");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");
// const { verify } = require("jsonwebtoken");

authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);


module.exports = {authRouter};