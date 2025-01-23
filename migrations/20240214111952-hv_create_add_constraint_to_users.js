'use strict';
const tableConstants = require('../constants/tables.constants');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addColumn(tableConstants.USERS, 'role_id', {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   after: 'id'
    // });

    // await queryInterface.addColumn(tableConstants.USERS, 'company_id', {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   after: 'role_id'
    // });

    // await queryInterface.addColumn(tableConstants.USERS, 'location_id', {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   after: 'company_id'
    // });

    // await queryInterface.addColumn(tableConstants.USERS, 'division_id', {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   after: 'location_id'
    // });

    // await queryInterface.addConstraint(tableConstants.USERS, {
    //   fields: ['role_id'],
    //   type: 'FOREIGN KEY',
    //   references: {
    //     table: tableConstants.ROLE,
    //     field: 'id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'NO ACTION'
    // });

    // await queryInterface.addConstraint(tableConstants.USERS, {
    //   fields: ['company_id'],
    //   type: 'FOREIGN KEY',
    //   references: {
    //     table: tableConstants.COMPANIES,
    //     field: 'id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'NO ACTION'
    // });

    // await queryInterface.addConstraint(tableConstants.USERS, {
    //   fields: ['location_id'],
    //   type: 'FOREIGN KEY',
    //   references: {
    //     table: tableConstants.LOCATIONS,
    //     field: 'id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'NO ACTION'
    // });

    // await queryInterface.addConstraint(tableConstants.USERS, {
    //   fields: ['division_id'],
    //   type: 'FOREIGN KEY',
    //   references: {
    //     table: tableConstants.DIVISIONS,
    //     field: 'id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'NO ACTION'
    // });
  },

  async down(queryInterface, Sequelize) {
    
  }
};
