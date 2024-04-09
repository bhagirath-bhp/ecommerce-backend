const sequelize = require('../db/db')
const {DataTypes} = require('sequelize')

const Order = sequelize.define('orders',{
    orderId:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    amount:{
        type:DataTypes.DECIMAL(10,2)
    },
    shippingAmount:{
        type:DataTypes.DECIMAL(10,2)
    },
    totalAmount:{
        type: DataTypes.DECIMAL(10,2)
    },
    stripePaymentId:{
        type:DataTypes.STRING
    },
    payment_status:{
        type: DataTypes.STRING,
        defaultValue: 'pending'
    }
},{
    timestamps:true
})

module.exports = Order