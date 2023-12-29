'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products',{
      productId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoryId:{
        type: Sequelize.INTEGER,
        references:{
          model: 'categories',
          key: 'categoryId'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      collectionId:{
        type:Sequelize.INTEGER,
        references:{
          model: 'collections',
          key: 'collectionId'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.DECIMAL(10,2),
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt:{
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('products')
  }
};
