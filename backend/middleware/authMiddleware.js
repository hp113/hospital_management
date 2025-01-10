const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) =>{
    // console.log(req.headers);
    const token = req.headers['authorization'];
    // console.log(token);
    if(! token){
        return res.status(400).json({message:'No Token'});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
        if(err){
            return res.status(401).json({message:'unauthorized'});
        }
        req.user = decoded;
        next();
    });
};

const checkRole = (roles) =>{
    return (req, res, next) =>{
        if(roles!=req.user.role){
            return res.status(400). json({message:'Access denied'})
        };
        next();
    }
}

module.exports = {verifyToken, checkRole};