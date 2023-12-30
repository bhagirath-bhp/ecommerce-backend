'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('addresses',{
      addressId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      address_line_1:{
        type: Sequelize.STRING
      },
      address_line_2:{
        type:Sequelize.STRING
      },
      countryId:{
        type:Sequelize.INTEGER,
        references:{
          model: 'countries',
          key: 'countryId'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      zipCode:{
        type:Sequelize.STRING
      },
      city:{
        type:Sequelize.STRING,
      },
      state:{
        type:Sequelize.STRING,
      },
      userId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'users',
          key: 'userId'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
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
    return queryInterface.dropTable('addresses')
  }
};
