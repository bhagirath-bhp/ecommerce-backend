const sequelize = require('../db/db')
const {DataTypes} = require('sequelize')

const Collection = sequelize.define('collections',{
    collectionId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    timestamps: false,
    hooks:{
        beforeCreate: (collection) => {
         collection.name = collection.name.toLowerCase()
    }}
})

module.exports = Collection