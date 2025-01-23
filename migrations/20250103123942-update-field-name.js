'use strict';

const { REPORT_REMARK } = require('../constants/tables.constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(REPORT_REMARK, 'hazards', {
      type: Sequelize.STRING,      // Keep the same type
      allowNull: false,           // Ensure the column is not nullable
      defaultValue: 'No',     // Set the new default value
    });
    await queryInterface.changeColumn(REPORT_REMARK, 'moisture_dynamics', {
      type: Sequelize.STRING,      // Keep the same type
      allowNull: false,           // Ensure the column is not nullable
      defaultValue: 'Yes',     // Set the new default value
    });
    await queryInterface.changeColumn(REPORT_REMARK, 'oil_reconditioning', {
      type: Sequelize.STRING,      // Keep the same type
      allowNull: false,           // Ensure the column is not nullable
      defaultValue: 'No',     // Set the new default value
    });
    await queryInterface.changeColumn(REPORT_REMARK, 'oil_replacement', {
      type: Sequelize.STRING,      // Keep the same type
      allowNull: false,           // Ensure the column is not nullable
      defaultValue: 'No',     // Set the new default value
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
