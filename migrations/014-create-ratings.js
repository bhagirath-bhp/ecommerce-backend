'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ratings',{
      ratingId:{
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
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
      value:{
        type: Sequelize.DECIMAL(10,2)
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable('ratings')
  },
  order: 14
};
