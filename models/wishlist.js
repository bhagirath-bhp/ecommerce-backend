const sequelize = require('../db/db')
const {DataTypes} = require('sequelize')

const Wishlist = sequelize.define('wishlists',{
    wishlistId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId:{
        type:DataTypes.INTEGER,
    }
},{
    timestamps: false
})

module.exports = Wishlist