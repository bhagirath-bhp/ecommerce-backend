'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const User = require('./user')
const Address = require('./address')
const Category = require('./category')
const Country = require('./country')
const Image = require('./image')
const Product = require('./product')
const Variant = require('./variant')

User.hasMany(Address)

Address.belongsTo(User,{
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

Country.hasMany(Address)

Address.belongsTo(Country,{
  foreignKey: 'countryId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

// Category.hasMany(Product)

// Product.belongsTo(Category, {
//   foreignKey: 'categoryId',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE'
// })

// Product.hasMany(Image,{
//   foreignKey: 'productId'
// })

// Image.belongsTo(Product,{
//   foreignKey:'productId',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE'
// })

// Product.hasMany(Variant)

// Variant.belongsTo(Product,{
//   foreignKey: 'productId',
//   onDelete: 'CASCADE',
// })

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config, {
    logging: console.log,
  });
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
