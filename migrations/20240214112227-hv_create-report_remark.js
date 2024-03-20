'use strict';
const { REPORT_REMARK, USERS, APPRTYPE } = require('../constants/tables.constants');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(REPORT_REMARK, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      lab_report_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      equipment_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      reliability: {
        type: Sequelize.STRING,
        allowNull: false
      },
      hazards: {
        type: Sequelize.STRING,
        allowNull: false
      },
      moisture_dynamics: {
        type: Sequelize.STRING,
        allowNull: false
      },
      oil_reconditioning: {
        type: Sequelize.STRING,
        allowNull: false
      },
      oil_replacement: {
        type: Sequelize.STRING,
        allowNull: false
      },
      next_tests: {
        type: Sequelize.STRING,
        allowNull: true
      },
      next_sample_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      comments: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      action_items: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: USERS,
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: USERS,
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      created_at: {
        allowNull: false,
        type: 'TIMESTAMP'
      },
      updated_at: {
        allowNull: false,
        type: 'TIMESTAMP'
      },
      deleted_at: {
        type: 'TIMESTAMP'
      }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(REPORT_REMARK);
  }
};
