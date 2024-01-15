const {DataTypes} = require('sequelize')
const sequelize = require('../db/db')
const bcrypt = require('bcryptjs')
const Address = require('./address')

const User = sequelize.define('users', {
    userId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number:{
        type: DataTypes.STRING
    },
    role:{
        type: DataTypes.ENUM,
        values:['user','admin'],
        defaultValue:'user',
        allowNull: false
    }
},{
    timestamps: true,
    hooks:{
        beforeCreate: async(user) => {
            if(user.password){
                user.password = await bcrypt.hash(user.password,10)
            }
        }
    }
})

module.exports = User