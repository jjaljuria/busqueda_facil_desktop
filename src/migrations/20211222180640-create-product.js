'use strict';
const {Sequelize} = require('sequelize');

module.exports = {
  up: async ({context : queryInterface}) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      price: {
        type: Sequelize.REAL,
        allowNull:false
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
    await queryInterface.dropTable('Products');
  }
};