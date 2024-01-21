const Wishlist = require('../models/wishlist')
const WishlistItems = require('../models/wishlistItems')
const User = require('../models/user')
const Image = require('../models/image')
const Product = require('../models/product')

User.hasOne(Wishlist,{
    foreignKey:'userId',
    onDelete: 'CASCADE',
    onUpdate:'CASCADE'
})

Wishlist.belongsTo(User,{
    foreignKey:'userId'
})

WishlistItems.belongsTo(Product,{
    foreignKey: 'productId'
})

exports.addToWishlist = async(req,res) => {
    try {
        const {productId,userId} = req.body 

        const exists = await Wishlist.findOne({
            where:{
                userId: userId
            }
        })
        if(exists){
            await WishlistItems.create({productId,wishlistId: exists.wishlistId})
            return res.status(200).json("added to wishlist")
        }

        const wishlist = await Wishlist.create({
            userId
        })

        await WishlistItems.create({productId, wishlistId: wishlist.wishlistId})
        return res.status(200).json("added to wishlist")
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}

exports.getWishlist = async(req,res) => {
    try {
        const {id} = req.params
        const wishlist = await Wishlist.findOne({
            where:{
                userId:id
            }
        })

        if(wishlist){
            const items = await WishlistItems.findAll({
                where:{
                    wishlistId: wishlist.wishlistId
                },
                include:[
                    {
                        model: Product,
                        attributes: ['productId','name','description','price','quantity'],
                        include:[
                            {
                                model: Image,
                                attributes:['imageURL']
                            }
                        ]
                    },
                ],
                attributes:['wishlistId']
            })
            return res.status(200).json(items)
        }

        return res.status(400).json("no items found")
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}