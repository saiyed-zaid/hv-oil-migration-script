'use strict';
const { Model, DataTypes } = require('sequelize');
const tableConstants = require('../constants/tables.constants');
const sequelize = require('../services/database');

class Request_Shipping extends Model {
  static associate(models) {
    models.Request_shipping.belongsTo(models.Company, { foreignKey: 'company_id', targetKey: 'id', as: 'company' });
    models.Request_shipping.addScope('company', {
      include: [{
        model: models.Company,
        as: 'company',
        include: [{ model: models.Location, as: 'location' }]
      }]
    });
    models.Request_shipping.belongsTo(models.Division, { foreignKey: 'division_id', targetKey: 'id', as: 'division' });
    models.Request_shipping.addScope('division', { include: [{ model: models.Division, as: 'division' }] });
  }
}
Request_Shipping.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  shipping_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: tableConstants.COMPANIES,
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
  location_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: tableConstants.LOCATIONS,
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
  division_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: tableConstants.DIVISIONS,
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
  syringe_number: {
    type: DataTypes.STRING,
  },
  bottle_number: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM({
      values: ['shipped', 'received', 'undetermined', 'request']
    }),
    defaultValue: 'shipped',
    allowNull: false
  },
  comments: {
    type: DataTypes.STRING,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: tableConstants.USERS,
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: tableConstants.USERS,
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
}, {
  sequelize,
  modelName: 'Request_shipping',
  tableName: tableConstants.REQUEST_SHIPPINGS,
  timestamps: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});

module.exports = Request_Shipping;