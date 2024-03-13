'use strict';
const { COMPANIES, USERS, LOCATIONS, EQUIPMENT, DIVISIONS, APPRTYPE } = require('../constants/tables.constants');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(EQUIPMENT, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
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
      location_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      appr_type_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      company_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
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
      serial_number: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      equipment_number: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      designation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      appr_type_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        primaryKey: true,
        allowNull: false,
        references: {
          model: {
            tableName: APPRTYPE,
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      region_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      substn_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      norm_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fluid_type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ep_desc: {
        type: Sequelize.STRING,
        allowNull: true
      },
      manufacturer: {
        type: Sequelize.STRING,
        allowNull: true
      },
      year_manufacturer: {
        type: Sequelize.STRING,
        allowNull: true
      },
      kv_rating: {
        type: Sequelize.STRING,
        allowNull: true
      },
      mva_rating: {
        type: Sequelize.STRING,
        allowNull: true
      },
      oilpres: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cooling: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fluid_vol: {
        type: Sequelize.STRING,
        allowNull: true
      },
      surveillance: {
        type: Sequelize.STRING,
        allowNull: true
      },
      eqp_remarks: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cond: {
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
        // allowNull: false,
        type: 'TIMESTAMP'
      },
      updated_at: {
        // allowNull: false,
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
    await queryInterface.dropTable(EQUIPMENT);
  }
};
