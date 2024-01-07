'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('images',{
      imageId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      imageName:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageURL:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      productId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key:'productId'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('images')
  },
  order:8,
};
