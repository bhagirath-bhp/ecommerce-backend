const sequelize = require('../db/db')
const {DataTypes} = require('sequelize')
const Product = require('./product')

const Category = sequelize.define('categories', {
    categoryId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryName: {
        type:DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps:false,
    hooks:{
        beforeCreate: (category) => {
            category.categoryName = category.categoryName.toLowerCase()
        }
    }
})

module.exports = Category