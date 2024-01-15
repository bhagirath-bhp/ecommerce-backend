'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('countries',{
      countryId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    countryName:{
        type: Sequelize.STRING,
        allowNull: false
    }
    })
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.dropTable('countries')
  },
  order:3,
};
