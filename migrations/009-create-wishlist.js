'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('wishlists',{
      wishlistId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId:{
        type:Sequelize.INTEGER,
        references:{
          model: 'users',
          key:'userId'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    })
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.dropTable('wishlists')
  },
  order:9
};
