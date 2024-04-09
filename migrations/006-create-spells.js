'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('spells',{
      spellId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name:{
        type:Sequelize.STRING,
        allowNull: false,
      },
      description:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      collectionId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'collections',
          key: 'collectionId'
        }
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable('spells')
  },
  order:7
};
