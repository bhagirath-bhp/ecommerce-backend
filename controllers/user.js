const sequelize = require('../db/db')
const User = require('../models/user')
const Country = require('../models/country')
const Address = require('../models/address')
const cookieToken = require('../utils/cookieToken')
const bcrypt = require('bcryptjs')
const { Op, where } = require('sequelize')

exports.signup = async(req,res) => {
    try {
        const {first_name,last_name,email,password, phone_number} = req.body

        const existingUser = await User.findOne({where: {email: email}})
        if(existingUser){
            return res.status(400).json("user already exists")
        }

        const user = await User.create({
            first_name,
            last_name,
            email,
            phone_number,
            password
        })

        cookieToken(user,res)
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}

exports.login = async(req,res) => {
    try {
        const {email,password,phone_number} = req.body 
        const user = await User.findOne({
            where: {
                [email ? "email" : "phone_number"]:email||phone_number
            }
        })

        if(!user){
            return res.status(400).json("no user found")
        }

        const isValidated = await bcrypt.compare(password,user.password)

        if(!isValidated){
            return res.status(400).json("wrong credentials")
        }

        cookieToken(user,res)
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}

exports.addAddress = async(req,res) => {
    try {
        const {address_line_1,address_line_2,city,country,zipCode,userId} = req.body 
        const c = await Country.findOne({
            where:{
                countryName:{
                    [Op.iLike] : `%${country}`
                }
            }
        })
        if(!c){
            const newCountry = await Country.create({countryName: country})
            await Address.create({
                address_line_1,
                address_line_2,
                city,
                countryId: newCountry.countryId,
                zipCode,
                userId
            })

            return res.status(200).json("address added")
        }

        await Address.create({
            address_line_1,
            address_line_2,
            countryId: c.countryId,
            zipCode,
            userId
        })

        return res.status(200).json("address added")
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}

exports.updateAddress = async(req,res) => {
    try {
        const {address_line_1,address_line_2,city,zipCode,userId} = req.body 
        await Address.update(
            {address_line_1,address_line_2,city,zipCode},{where: {userId}}
        )

        return res.status(200).json("address updated")
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}

exports.removeAddress = async(req,res) => {
    try {
        const {addressId,userId} = req.body
        await Address.destroy({
            where:{
                addressId,
                userId
            }
        })

        return res.status(200).json("address deleted")
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}