'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('wishlistitems',{
      itemId:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      wishlistId:{
        type: Sequelize.INTEGER,
        references:{
          model: 'wishlists',
          key: 'wishlistId'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      productId:{
        type: Sequelize.INTEGER,
        references:{
          model: 'products',
          key:'productId'
        }
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('wishlistitems')
  },
  order:9,
};
