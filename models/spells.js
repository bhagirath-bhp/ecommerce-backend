const sequelize = require('../db/db')
const {DataTypes} = require('sequelize')

const Spell = sequelize.define('spells',{
    spellId:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull:false
    }
},{timestamps:false})

module.exports = Spell