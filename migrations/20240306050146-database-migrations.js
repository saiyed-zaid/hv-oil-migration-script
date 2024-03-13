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
      },
      endTime: {
        type: 'TIMESTAMP',
      },
      status: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: 'TIMESTAMP',
        allowNull: false
      },
      updated_at: {
        allowNull: false,
        type: 'TIMESTAMP'
      },
      deleted_at: {
        type: 'TIMESTAMP'
      }
    },);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('database-migration');
  }
};
