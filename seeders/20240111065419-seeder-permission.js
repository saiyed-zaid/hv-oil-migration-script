'use strict';
const { PERMISSION } = require('../constants/tables.constants');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let permission_data = [
      {
        name: "Company",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Division",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Equipment",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "HV Oil branch",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Report",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Request Shipping Supply",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Role Permission",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Shipment",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Users",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Roles",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "List of branches",
        parent_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Add new branch",
        parent_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Edit branch details",
        parent_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Enable / Disable branch",
        parent_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Delete branch",
        parent_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "List of companies",
        parent_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Add new company",
        parent_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Edit company details",
        parent_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Enable / disable company",
        parent_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      // {
      //   name: "Choose branch",
      //   parent_id: 1,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      // {
      //   name: "View company details page",
      //   parent_id: 1,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      {
        name: "Delete company",
        parent_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "List of users",
        parent_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Add new user",
        parent_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Edit user details",
        parent_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Activate / deactivate user",
        parent_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Reset password",
        parent_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Delete user",
        parent_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      // {
      //   name: "Choose branch, company and division",
      //   parent_id: 9,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      {
        name: "List of divisions",
        parent_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Add new division",
        parent_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Edit division details",
        parent_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Activate / deactivate division",
        parent_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      // {
      //   name: "Choose branch and company",
      //   parent_id: 2,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      {
        name: "View division details page",
        parent_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Delete division",
        parent_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "List of shipments",
        parent_id: 8,
        created_at: new Date(),
        updated_at: new Date()
      },
      // {
      //   name: "Filter shipment",
      //   parent_id: 8,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      // {
      //   name: "Shipment basic details",
      //   parent_id: 8,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      // {
      //   name: "Shipment data",
      //   parent_id: 8,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      {
        name: "Add new shipment",
        parent_id: 8,
        created_at: new Date(),
        updated_at: new Date()
      },
      // {
      //   name: "Choose branch, company and division",
      //   parent_id: 8,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      {
        name: "List of shipping supply requests",
        parent_id: 6,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Add new shipping supply request",
        parent_id: 6,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Action",
        parent_id: 6,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Add new shipment from request",
        parent_id: 6,
        created_at: new Date(),
        updated_at: new Date()

      },
      // {
      //   name: "Choose branch, company and division",
      //   parent_id: 6,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      {
        name: "List of equipments",
        parent_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      // {
      //   name: "Filter equipment",
      //   parent_id: 3,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      {
        name: "Print labels",
        parent_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      // {
      //   name: "Create / edit equipment",
      //   parent_id: 3,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      {
        name: "View equipment details page",
        parent_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      // {
      //   name: "File upload",
      //   parent_id: 3,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      // {
      //   name: "Choose company and division",
      //   parent_id: 3,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      // {
      //   name: "Export equipment",
      //   parent_id: 3,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      // {
      //   name: "Choose branch, company and division",
      //   parent_id: 3,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      {
        name: "Add new equipment",
        parent_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Edit equipment details",
        parent_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Import equipment",
        parent_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "List of SROM reports",
        parent_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "View report PDF",
        parent_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Search report",
        parent_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "List of general reports",
        parent_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Export general report",
        parent_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Export SROM report",
        parent_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Delete SORM report",
        parent_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Delete general report",
        parent_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Upload CSV",
        parent_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      // {
      //   name: "Save CSV data into database",
      //   parent_id: 5,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      {
        name: "Generate report PDF",
        parent_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      // {
      //   name: "Get support from java experts",
      //   parent_id: 5,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      // {
      //   name: "Choose branch, company and division",
      //   parent_id: 5,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      {
        name: "Display permissions matrix",
        parent_id: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      // {
      //   name: "CRUD Role",
      //   parent_id: 7,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      // {
      //   name: "Assign role to user",
      //   parent_id: 7,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      // {
      //   name: "Permission based access control",
      //   parent_id: 7,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      {
        name: "Assign permission",
        parent_id: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Add new role",
        parent_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Delete role",
        parent_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "List of roles",
        parent_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]

    permission_data.forEach(item => {
      item.slug = item.name.split(' ').join('_').split('/').join('_').split(',').join('_').split('___').join('_').split('__').join('_').toLowerCase();
    })

    await queryInterface.bulkInsert(PERMISSION, permission_data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(PERMISSION, null, {});
  }
};