'use strict';
const { USERS, FQTABLE, COMPANIES, DIVISIONS, LOCATIONS } = require('../constants/tables.constants');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(FQTABLE, {
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
        type: 'TIMESTAMP',  // TIMESTAMP
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
      lab_report_number: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      d1816_1: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      d1816_2: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      d877: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      water: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      acid_number: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      ift: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      pf25: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      pf100: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      inhibitor_dbp: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      inhibitor_dbpc: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      visual: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      color: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      viscosity: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      d1275b: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      d130: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      sg: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      alumi_number: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      barium: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      cadmium: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      boron: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      calcium: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      chromium: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      copper: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      iron: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      lead: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      molybde_number: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      magnesium: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      nickel: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      phosphorus: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      silicon: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      silver: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      sodium: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      tin: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      tungsten: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      zinc: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      p4c: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      p6c: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      p14c: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      p21c: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      p38c: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      a1242: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      a1254: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      a1260: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      total_pcb: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      furfural: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      mfurfural: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      hmfurfural: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      furfurylalc: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      acetylfuran: {
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
    await queryInterface.dropTable(FQTABLE);
  }
};
