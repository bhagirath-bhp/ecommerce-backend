const sequelize = require('../db/db')
const {DataTypes} = require('sequelize')
const Category = require('./category')
const Image = require('./image')

const Product = sequelize.define('products', {
    productId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    categoryId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }
},{
    timestamps: true,
})




module.exports = Product