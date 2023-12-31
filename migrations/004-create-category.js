'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      categoryId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      categoryName: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('categories')
  },
  order:4,
};
