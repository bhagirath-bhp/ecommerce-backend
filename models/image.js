const sequelize = require('../db/db')
const {DataTypes} = require('sequelize')
const Product = require('./product')

const Image = sequelize.define('images', {
    imageId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imageName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageURL:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    productId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    hooks:{
        beforeCreate: (image) => {
            image.imageName = image.imageName.replace(/\s/g, "").toLowerCase()
        }
    }
})


module.exports = Image