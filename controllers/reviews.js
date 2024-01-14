const Review = require('../models/review')
const User = require('../models/user')
const Product = require('../models/product')
const { calculateAvgRating } = require('../utils/avgRating')

Product.hasMany(Review,{foreignKey: 'productId'})
User.hasOne(Review,{foreignKey: 'userId'})
Review.belongsTo(User,{foreignKey:'userId'})

exports.addRating = async(req,res) => {
    try {
        const {userId,productId,rating,comment} = req.body 

        const exists = await Review.findOne({
            where:{
                userId,
                productId
            }
        })

        if(exists){
            exists.rating = rating,
            exists.comment = comment
            await exists.save()

            return res.status(200).json("review updated")
        }

        await Review.create({
            userId,
            productId,
            comment,
            rating
        })

        return res.status(200).json("review added")
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}

exports.removeRating = async(req,res) => {
    try {
        const {userId,productId} = req.body 

        const review = await Review.findOne({
            where:{
                userId,
                productId
            }
        })

        if(!review) return res.status(404).json("no review found")

        await review.destroy()

        return res.status(200).json("review deleted")
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}

exports.getRatingsForAProduct = async(req,res) => {
    try {
        const {productId} = req.params

        const ratings = await Review.findAll({
            attributes: ['reviewId','rating','comment'],
            include:[
                {
                    model: User,
                    attributes:['first_name','last_name']
                }
            ],
            where:{productId}
        })

        const avgRating = await calculateAvgRating(ratings)
        return res.status(200).json({"ratings":ratings, "avgRating":avgRating})
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}