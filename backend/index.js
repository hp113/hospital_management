const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json())

// const authRoutes = require('./routes/auth');
const { verifyToken, checkRole } = require('./middleware/authMiddleware');
const { authRouter } = require('./routes/auth');
const { managerRouter } = require('./routes/foodManager');
const { pantryRouter } = require('./routes/pantry');
const { deliveryRouter } = require('./routes/delivery');

app.use("/api/auth", authRouter);
app.use("/api/manager", verifyToken, checkRole('MANAGER'), managerRouter);
app.use("/api/pantry", verifyToken, checkRole('PANTRY'), pantryRouter);
app.use("/api/delivery", verifyToken, checkRole('DELIVERY'), deliveryRouter);

app.get("/", (req, res)=>{
    res.json({message:"hello"});
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});