const sequelize = require('../db/db')
const {DataTypes} = require('sequelize')
const User = require('./User')

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

Address.belongsTo(User,{
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

module.exports = Address