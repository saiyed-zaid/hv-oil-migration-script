'use strict';
const { APPRTYPE } = require('../constants/tables.constants');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(APPRTYPE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
        unique: true,
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(APPRTYPE);
  }
};
