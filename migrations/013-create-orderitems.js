'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('orderitems',{
      itemId:{
        type:Sequelize.BIGINT,
        primaryKey:true,
        autoIncrement:true
      },
      orderId:{
        type:Sequelize.UUID,
        allowNull: false,
        references:{
          model: 'orders',
          key: 'orderId'
        },
        onDelete:'cascade',
        onUpdate: 'cascade'
      },
      productId:{
        type:Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'products',
          key: 'productId'
        }
      },
      quantity:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price:{
        type:Sequelize.DECIMAL(10,2),
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
   return await queryInterface.dropTable('orderitems')
  },
  order:13
};
