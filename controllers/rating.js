const Rating = require('../models/rating')
const User = require('../models/user')
const Product = require('../models/product')

Product.hasMany(Rating,{foreignKey:'productId'})
User.hasOne(Rating,{foreignKey: 'userId'})

exports.addRating = async(req,res) => {
    try {
        const {value,userId,productId} = req.body
        const exists = await Rating.findOne({
            where:{
                userId,
                productId
            }
        })

        if(value > 5 || value < 1){
            return res.status(500).json("value should be between 1 and 5")
        }

        if(exists){
            exists.value = value;
            await exists.save()
            return res.status(200).json("rating updated")
        }

        await Rating.create({
            userId,
            productId,
            value
        })

        return res.status(200).json("rating added")
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}

exports.removeRating = async(req,res) => {
    try {
        const {userId,productId} = req.body 
        const rating = await Rating.destroy({
            where:{
                userId,
                productId
            }
        })

        if(!rating) return res.status(404).json("no rating found")

        return res.status(200).json("rating deleted")
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}