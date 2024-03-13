'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('database-migration', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      tableName: {
        type: Sequelize.STRING,
      },
      startTime: {
        type: 'TIMESTAMP',
        defaultValue: null
      },
      endTime: {
        type: 'TIMESTAMP',
        defaultValue: null
      },
      status: {
        type: Sequelize.STRING, // PENDING, IN_PROGRESS, DONE, FAILED
        defaultValue: 'PENDING'
      },
      created_at: {
        type: 'TIMESTAMP'
      },
      updated_at: {
        type: 'TIMESTAMP'
      },
      deleted_at: {
        type: 'TIMESTAMP'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('database-migration');
  }
};
