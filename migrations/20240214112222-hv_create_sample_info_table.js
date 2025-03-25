'use strict';
const { SAMPLEINFO, COMPANIES, USERS, APPRTYPE, DIVISIONS, LOCATIONS, EQUIPMENT } = require('../constants/tables.constants');
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable(SAMPLEINFO, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
      },
      equipment_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: EQUIPMENT
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
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
        // allowNull: false,
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
      division_name: {
        type: Sequelize.STRING,
        // allowNull: false
      },
      location_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      equipment_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      serial_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      appr_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: APPRTYPE
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      appr_type_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sample_date: {
        type: Sequelize.DATE // DATETIME
      },
      lab_report_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tank: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sample_pt: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lab_recv_date: {
        type: Sequelize.DATE,  // TIMESTAMP
        allowNull: false
      },
      lab_test_date: {
        type: Sequelize.DATE,  // TIMESTAMP
        allowNull: false
      },
      ship_date: {
        type: Sequelize.DATE,  // TIMESTAMP
        allowNull: false
      },
      job_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      order_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sample_r: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fluid_temperature: {
        type: Sequelize.STRING,
        allowNull: true
      },
      amb_temperature: {
        type: Sequelize.STRING,
        allowNull: true
      },
      weather: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pv_gauge: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lvl_gauge: {
        type: Sequelize.STRING,
        allowNull: true
      },
      rlf_vlv_clr: {
        type: Sequelize.STRING,
        allowNull: true
      },
      oil_leak: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ground_status: {
        type: Sequelize.STRING,
        allowNull: true
      },
      paint: {
        type: Sequelize.STRING,
        allowNull: true
      },
      breather: {
        type: Sequelize.STRING,
        allowNull: true
      },
      corrosion: {
        type: Sequelize.STRING,
        allowNull: true
      },
      desiccant: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ops_count: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lab_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      is_base: {
        type: Sequelize.STRING,
        allowNull: true
      },
      exclude: {
        type: Sequelize.STRING,
        allowNull: true
      },
      reason: {
        type: Sequelize.STRING,
        allowNull: true
      },
      first_report_date: {
        type: Sequelize.DATE,  // TIMESTAMP
        allowNull: false
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
    await queryInterface.dropTable(SAMPLEINFO);
  }
};
