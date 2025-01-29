'use strict';
const { ROLE } = require('../constants/tables.constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(ROLE, [
      {
        id: 1,
        name: 'admin',
        is_hvoil_role: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'user',
        is_hvoil_role: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'employee',
        is_hvoil_role: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
  }
};
