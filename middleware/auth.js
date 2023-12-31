const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.isLoggedIn = async(req,res,next) => {
    try {
        const token = req.headers['authorization'] || req.cookies.token;

        if (!token) {
            res.status(401).json("unauthorized access");
            return next(new Error("No token found"));
        }

        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = await User.findByPk(decoded.id);
        next();

    } catch (error) {
        console.error(error);
    }
}