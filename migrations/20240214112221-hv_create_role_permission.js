'use strict';
const { ROLE_PERMISSION, PERMISSION, ROLE } = require('../constants/tables.constants');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(ROLE_PERMISSION, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      permission_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: PERMISSION,
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: ROLE,
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      is_allow: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable(ROLE_PERMISSION);
  }
};
