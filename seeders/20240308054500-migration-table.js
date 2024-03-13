'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('database-migration', [
      {
        id: 1,
        tableName: 'COMPANY_AND_DIVISIONS',
        // startTime: "",
        // endTime: "test1",
        status: "PENDING",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        tableName: 'USERS',
        // startTime: "",
        // endTime: "test1",
        status: "PENDING",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        tableName: 'SHIPPING',
        // startTime: "",
        // endTime: "test1",
        status: "PENDING",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        tableName: 'EQUIPMENT',
        // startTime: "",
        // endTime: "test1",
        status: "PENDING",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        tableName: 'REPORTS',
        // startTime: "",
        // endTime: "test1",
        status: "PENDING",
        created_at: new Date(),
        updated_at: new Date()
      }
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
