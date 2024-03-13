'use strict';
const { USERS, COMPANIES, LOCATIONS, EQUIPMENT, DIVISIONS, APPRTYPE } = require('../constants/tables.constants');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database');

class Equipment extends Model {
  static associate(models) {
    models.Equipment.belongsTo(models.Division, { foreignKey: 'division_id', sourceKey: 'id', as: 'division' });
    models.Equipment.addScope('division', { include: [{ model: models.Division, as: 'division' }] });
    models.Equipment.belongsTo(models.Company, { foreignKey: 'company_id', sourceKey: 'id', as: 'company' });
    models.Equipment.addScope('company', { include: [{ model: models.Company, as: 'company' }] });
    models.Equipment.belongsTo(models.Location, { foreignKey: 'location_id', sourceKey: 'id', as: 'location' });
    models.Equipment.addScope('location', { include: [{ model: models.Location, as: 'location' }] });
    models.Equipment.belongsTo(models.Apprtype, { foreignKey: 'appr_type_id', sourceKey: 'id', as: 'appr_type' });
    models.Equipment.addScope('appr_type', { include: [{ model: models.Apprtype, as: 'appr_type' }] });
  }
}
Equipment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  location_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: LOCATIONS,
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
  location_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  company_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: {
        tableName: COMPANIES,
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
        tableName: DIVISIONS,
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
  serial_number: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  equipment_number: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  appr_type_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: {
        tableName: APPRTYPE,
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
  appr_type_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  region_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  substn_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  norm_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fluid_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ep_desc: {
    type: DataTypes.STRING,
    allowNull: true
  },
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: true
  },
  year_manufacturer: {
    type: DataTypes.STRING,
    allowNull: true
  },
  kv_rating: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mva_rating: {
    type: DataTypes.STRING,
    allowNull: true
  },
  oilpres: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cooling: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fluid_vol: {
    type: DataTypes.STRING,
    allowNull: true
  },
  surveillance: {
    type: DataTypes.STRING,
    allowNull: true
  },
  eqp_remarks: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cond: {
    type: DataTypes.STRING,
    allowNull: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: {
        tableName: USERS,
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
        tableName: USERS,
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
  created_at: {
    allowNull: true,
    type: 'TIMESTAMP'
  },
  updated_at: {
    allowNull: true,
    type: 'TIMESTAMP'
  },
  deleted_at: {
    type: 'TIMESTAMP'
  }
}, {
  sequelize,
  modelName: 'Equipment',
  tableName: EQUIPMENT,
  timestamps: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
});

module.exports = Equipment;