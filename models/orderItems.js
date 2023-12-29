const sequelize = require('../db/db')
const {DataTypes} = require('sequelize')

const OrderItem = sequelize.define('orderitems',{
    itemId:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    orderId:{
        type:DataTypes.UUID,
        allowNull: false,
    },
    productId:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price:{
        type: DataTypes.DECIMAL(10,2),
        allowNull:false
    }
},{timestamps:true})

module.exports = OrderItem