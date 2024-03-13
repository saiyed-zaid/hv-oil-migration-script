'use strict';
const { REQUEST_SHIPPINGS, COMPANIES, LOCATIONS, DIVISIONS, USERS } = require('../constants/tables.constants');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(REQUEST_SHIPPINGS, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      shipping_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: COMPANIES,
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      location_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: LOCATIONS,
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      division_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: DIVISIONS,
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      syringe_number: {
        type: Sequelize.STRING,
      },
      bottle_number: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM({
          values: ['shipped', 'received', 'undetermined', 'request']
        }),
        defaultValue: 'shipped',
        allowNull: false
      },
      comments: {
        type: Sequelize.STRING,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
        allowNull: false,
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
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(REQUEST_SHIPPINGS);
  }
};
