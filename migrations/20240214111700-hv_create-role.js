'use strict';
const { ROLE } = require('../constants/tables.constants');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ROLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: 'TIMESTAMP',
      },
      updated_at: {
        allowNull: false,
        type: 'TIMESTAMP'
      },
      deleted_at: {
        type: 'TIMESTAMP'
      }
    }, {
      timestamps: true,
      underscored: true,
      paranoid: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ROLE);
  }
};
