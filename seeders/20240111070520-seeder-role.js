'use strict';
const { ROLE } = require('../constants/tables.constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(ROLE, [
      {
        id: 1,
        name: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'user',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
  }
};
