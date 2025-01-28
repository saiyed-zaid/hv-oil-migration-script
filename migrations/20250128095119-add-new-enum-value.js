const tablesConstants = require('../constants/tables.constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(tablesConstants.SHIPPINGS, 'status', {
      type: Sequelize.ENUM('shipped', 'received', 'undetermined', 'returned'),
      allowNull: false, // or true, depending on your column settings
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
