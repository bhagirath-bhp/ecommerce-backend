'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('orders', 'addressId')
    await queryInterface.dropTable('addresses')
    return await queryInterface.dropTable('countries')
  },

  async down (queryInterface, Sequelize) {
  },
  order:17
};
