const sequelize = require('../db/db')
const {DataTypes} = require('sequelize')

const Variant = sequelize.define('variants',{
    variantId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    price:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    productId:{
        type: DataTypes.INTEGER
    }
},{
    timestamps: true
})

module.exports = Variant