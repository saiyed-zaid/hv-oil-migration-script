'use strict';
const { APPRTYPE } = require('../constants/tables.constants');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(APPRTYPE, [
      {
        type: "BSH",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: "CBL",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: "CONS",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: "BULK_OIL",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: "CONSV",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: "LTC",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: "LTC1",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: "LTC2",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: "OCB",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: "OLTC",
        created_at: new Date(),
        updated_at: new Date()
      },{
        type: "PH",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: "PT",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: "REC",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: "REG",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: "TRN",
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
