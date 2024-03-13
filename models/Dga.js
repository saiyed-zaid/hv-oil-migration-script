'use strict';
const { USERS, FQTABLE, DGATABLE, COMPANIES, DIVISIONS, LOCATIONS } = require('../constants/tables.constants');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database');

class Dga extends Model {
  static associate(models) {

  }
}

Dga.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: COMPANIES
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
        tableName: DIVISIONS
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
        tableName: LOCATIONS
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  division_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sample_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  lab_report_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  h2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  o2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  n2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ch4: {
    type: DataTypes.STRING,
    allowNull: true
  },
  co: {
    type: DataTypes.STRING,
    allowNull: true
  },
  co2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  c2h4: {
    type: DataTypes.STRING,
    allowNull: true
  },
  c2h6: {
    type: DataTypes.STRING,
    allowNull: true
  },
  c2h2: {
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
    allowNull: false,
    type: DataTypes.DATE
  },
  updated_at: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deleted_at: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'Dga',
  tableName: DGATABLE,
  timestamps: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
});

module.exports = Dga;