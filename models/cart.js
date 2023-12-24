const sequelize = require('../db/db')
const {DataTypes} = require('sequelize')

const Cart = sequelize.define('carts', {
    cartId:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    timestamps: true,
})

module.exports = Cart