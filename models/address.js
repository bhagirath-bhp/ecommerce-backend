const sequelize = require('../db/db')
const {DataTypes} = require('sequelize')
const User = require('./user')

const Address = sequelize.define('addresses', {
    addressId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    address_line_1:{
        type:DataTypes.STRING
    },
    address_line_2:{
        type:DataTypes.STRING
    },
    countryId:{
        type:DataTypes.INTEGER
    },
    city:{
        type: DataTypes.STRING,
    },
    zipCode:{
        type: DataTypes.STRING
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: true
})

module.exports = Address