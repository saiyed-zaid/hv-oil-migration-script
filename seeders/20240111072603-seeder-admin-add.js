'use strict';
const { USERS } = require('../constants/tables.constants');
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(USERS, [{
      first_name: 'admin',
      last_name: '',
      username: 'admin',
      email: 'admin@hvoil.com',
      role_id: 1,
      password: '$2b$12$xlAbv6X/KhdYoi7dE6zKJeMRPAxPiAicCCC4YMD8kNOuJ4wFPYm4C',
      status: 'active',
      created_by: 1,
      updated_by: 1,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
  }
};
