const sequelize = require('../db/db')
const {DataTypes} = require('sequelize')

const Country = sequelize.define('countries', {
    countryId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    countryName:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false,
    hooks:{
        beforeCreate: (country) => {
            country.countryName = country.countryName.toLowerCase()
        }
    }
})

module.exports = Country