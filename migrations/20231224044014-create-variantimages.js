'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('variantimages',{
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
      variantId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'variants',
          key:'variantId'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('variantimages')
  }
};
