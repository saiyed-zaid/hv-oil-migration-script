'use strict';
const { Model, DataTypes } = require('sequelize');
const tableConstants = require('../constants/tables.constants');
const sequelize = require('../services/database');

class Shipping extends Model {
  static associate(models) {
    models.Shipping.belongsTo(models.Company, { foreignKey: 'company_id', targetKey: 'id', as: 'company' });
    models.Shipping.addScope('company', {
      include: [{
        model: models.Company,
        as: 'company',
        include: [{ model: models.Location, as: 'location' }]
      }]
    });
    models.Shipping.belongsTo(models.Division, { foreignKey: 'division_id', targetKey: 'id', as: 'division' });
    models.Shipping.addScope('division', { include: [{ model: models.Division, as: 'division' }] });
  }
}
Shipping.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  courier: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tracking_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shipping_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  company_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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
    primaryKey: true,
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
  shipping_type: {
    type: DataTypes.ENUM({
      values: ['shipped', 'received']
    })
  },
  syringe_number: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bottle_number: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM({
      values: ['shipped', 'received', 'undetermined', 'returned']
    }),
    defaultValue: 'shipped',
    allowNull: false
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
    allowNull: true,
    references: {
      model: {
        tableName: tableConstants.USERS,
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
  created_at: {
    type: 'TIMESTAMP'
  },
  updated_at: {
    type: 'TIMESTAMP'
  },
  deleted_at: {
    type: 'TIMESTAMP'
  }
}, {
  sequelize,
  modelName: 'Shipping',
  tableName: tableConstants.SHIPPINGS,
  timestamps: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});

module.exports = Shipping;