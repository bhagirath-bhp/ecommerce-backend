const sequelize = require('../db/db')
const User = require('../models/user')

exports.signup = async(req,res) => {
    try {
        const {first_name,last_name,email,password, phone_number} = req.body

        const existingUser = await User.findOne({where: {email: email}})
        if(existingUser){
            return res.status(400).json("user already exists")
        }

        const newUser = await User.create({
            first_name,
            last_name,
            email,
            phone_number,
            password
        })

        return res.status(200).json(newUser)
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}