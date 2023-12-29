const sequelize = require('../db/db')
const {DataTypes} = require('sequelize')

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
    },
    collectionId:{
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    price:{
        type: DataTypes.DECIMAL(10,2),
    }
},{
    timestamps: true,
})




module.exports = Product