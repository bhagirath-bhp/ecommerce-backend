'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('carts',{
      cartId:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
      },
      userId:{
        type:Sequelize.INTEGER,
        references:{
          model: 'users',
          key:'userId'
        },
        onDelete: 'cascade',
        onUpdate:'cascade'
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
    return await queryInterface.dropTable('carts')
  },
  order:10
};
