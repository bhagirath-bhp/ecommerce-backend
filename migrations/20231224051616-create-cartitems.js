'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cartitems',{
      itemId:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
      },
      productId:{
        type:Sequelize.INTEGER,
        references:{
          model: 'products',
          key:'productId'
        }
      },
      cartId:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'carts',
          key:'cartId'
        },
        onDelete:'cascade',
        onUpdate:'cascade'
      },
      variantId:{
        type:Sequelize.INTEGER,
        references:{
          model:'variants',
          key:'variantId',
        },
      },
      quantity:{
        type:Sequelize.INTEGER,
        allowNull: false
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
    return await queryInterface.dropTable('cartitems')
  }
};
