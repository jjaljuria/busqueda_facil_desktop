'use strict';
const {Sequelize} = require('sequelize');

module.exports = {
  up: async ({context : queryInterface}) => {
    await queryInterface.createTable('Currencies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.REAL,
        default: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async ({context : queryInterface}) => {
    await queryInterface.dropTable('Currencies');
  }
};