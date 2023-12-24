'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('variants',{
      variantId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      description:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      price:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      quantity:{
        type: Sequelize.INTEGER,
        allowNull:false
      },
      productId:{
        type: Sequelize.INTEGER,
        references:{
          model:'products',
          key:'productId'
        },
        onDelete:'cascade'
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
    return queryInterface.dropTable('variants')
  }
};
