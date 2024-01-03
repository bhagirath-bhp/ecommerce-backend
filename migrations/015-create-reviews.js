'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('reviews',{
      reviewId:{
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      userId:{
        type:Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'userId'
        },
        onDelete: 'cascade'
      },
      productId:{
        type: Sequelize.INTEGER,
        references:{
          model: 'products',
          key:'productId'
        },
        onDelete: 'cascade'
      },
      description:{
        type:Sequelize.TEXT,
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
    return await queryInterface.dropTable('reviews')
  },
  order:15
};
