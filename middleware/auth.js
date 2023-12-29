const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.isLoggedIn = async(req,res,next) => {
    try {
        const token = req.cookies.token || req.headers['Authorization'].replace("Bearer ","") || null
        // console.log(token);
        if(!token){
            res.status(401).json("unauthorized access")
            return next(new Error("No token found"))
        }


        const decode = jwt.verify(token,process.env.JWT_SECRET)

        req.user = await User.findByPk(decode.id)

        next()

    } catch (error) {
        console.error(error);
    }
}