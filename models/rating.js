const sequelize = require('../db/db')
const {DataTypes} = require('sequelize')

const Rating = sequelize.define('ratings',{
    ratingId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    userId:{
        type: DataTypes.INTEGER,
    },
    productId:{
        type: DataTypes.INTEGER
    },
    value:{
        type: DataTypes.DECIMAL(10,2)
    }
},{timestamps: false})

module.exports = Rating