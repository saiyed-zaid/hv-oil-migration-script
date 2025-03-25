'use strict';

const { USERS, DIAGTABLE, COMPANIES, DIVISIONS, LOCATIONS } = require('../constants/tables.constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(DIAGTABLE, {
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
        type: Sequelize.DATE,  // TIMESTAMP
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
      lab_report_number: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      rel_saturation: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      dewptc: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      dga_retest_date: {
        type: Sequelize.DATE,  // TIMESTAMP
        allowNull: true
      },
      fq_retest_date: {
        type: Sequelize.DATE,  // TIMESTAMP
        allowNull: true
      },
      tag: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      tdcg: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      etcg: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      thg: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      eshl: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      total_gas_content: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      o2_n2: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      co2_co: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      c2h4_c2h2: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      c2h6_ch4: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      estdp: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      pf_ratio: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      fq_index: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      piqr: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      pmean: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      pmedian: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      pq1: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      pq3: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      pskewness: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      pstddev: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      ptotal: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      ovrreli: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      gda_remarks: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      fq_remarks: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      moisture_remarks: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      norm_used: {
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
    await queryInterface.dropTable(DIAGTABLE);
  }
};


































