const sequelize = require('../db/db')
const {DataTypes} = require('sequelize')

const WishlistItems = sequelize.define('wishlistitems',{
    itemId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    wishlistId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    timestamps:false
})

module.exports = WishlistItems