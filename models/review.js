const sequelize = require('../db/db')
const {DataTypes} = require('sequelize')

const Review = sequelize.define('reviews',{
    reviewId:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    userId:{
        type: DataTypes.INTEGER,
    },
    productId:{
        type: DataTypes.INTEGER,
    },
    description:{
        type: DataTypes.TEXT
    }
},{timestamps: true})

module.exports = Review