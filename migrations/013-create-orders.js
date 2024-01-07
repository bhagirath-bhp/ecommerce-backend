'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('orders',{
      orderId:{
        type:Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      userId:{
        type:Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'users',
          key: 'userId'
        },
        onDelete: 'cascade'
      },
      amount:{
        type: Sequelize.DECIMAL(10,2),
      },
      shippingAmount:{
        type: Sequelize.DECIMAL(10,2),
      },
      totalAmount:{
        type: Sequelize.DECIMAL(10,2)
      },
      stripePaymentId:{
        type:Sequelize.STRING,
      },
      addressId:{
        type: Sequelize.INTEGER,
        references:{
          model: 'addresses',
          key: 'addressId'
        }
      },
      payment_status:{
        type: Sequelize.STRING,
        defaultValue: 'pending'
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
    return await queryInterface.dropTable('orders')
  },
  order:13
};
