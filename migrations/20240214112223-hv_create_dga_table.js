'use strict';

const { USERS, DGATABLE, COMPANIES, DIVISIONS, LOCATIONS } = require('../constants/tables.constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(DGATABLE, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: COMPANIES
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
            tableName: DIVISIONS
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
            tableName: LOCATIONS
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      division_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sample_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,  // TIMESTAMP
        allowNull: false
      },
      lab_report_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      h2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      o2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      n2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ch4: {
        type: Sequelize.STRING,
        allowNull: true
      },
      co: {
        type: Sequelize.STRING,
        allowNull: true
      },
      co2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      c2h4: {
        type: Sequelize.STRING,
        allowNull: true
      },
      c2h6: {
        type: Sequelize.STRING,
        allowNull: true
      },
      c2h2: {
        type: Sequelize.STRING,
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
        type: 'TIMESTAMP'  // TIMESTAMP
      },
      updated_at: {
        allowNull: false,
        type: 'TIMESTAMP'  // TIMESTAMP
      },
      deleted_at: {
        type: 'TIMESTAMP'  // TIMESTAMP
      }
    }, {
      timestamps: true,
      underscored: true,
      paranoid: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DGATABLE);
  }
};
