'use strict';
const { Model, DataTypes } = require('sequelize');
const { USERS, APPRTYPE, SAMPLEINFO, COMPANIES, EQUIPMENT, DIVISIONS, LOCATIONS } = require('../constants/tables.constants');
const sequelize = require('../services/database');

class SampleInfo extends Model {
  static associate(models) {
    models.SampleInfo.belongsTo(models.Division, { foreignKey: 'division_id', sourceKey: 'id', as: 'division' });
    models.SampleInfo.addScope('division', { include: [{ model: models.Division, as: 'division' }] });
    models.SampleInfo.belongsTo(models.Company, { foreignKey: 'company_id', sourceKey: 'id', as: 'company' });
    models.SampleInfo.addScope('company', { include: [{ model: models.Company, as: 'company' }] });
    models.SampleInfo.belongsTo(models.Location, { foreignKey: 'location_id', sourceKey: 'id', as: 'location' });
    models.SampleInfo.addScope('location', { include: [{ model: models.Location, as: 'location' }] });
    models.SampleInfo.belongsTo(models.Apprtype, { foreignKey: 'appr_type_id', sourceKey: 'id', as: 'appr_type' });
    models.SampleInfo.addScope('appr_type', { include: [{ model: models.Apprtype, as: 'appr_type' }] });
    models.SampleInfo.belongsTo(models.Equipment, { foreignKey: 'equipment_id', sourceKey: 'id', as: 'equipment' });
    models.SampleInfo.addScope('equipment', { include: [{ model: models.Equipment, as: 'equipment' }] });
    models.SampleInfo.belongsTo(models.Dga, { foreignKey: 'lab_report_number', sourceKey: 'lab_report_number', as: 'dga' });
    models.SampleInfo.addScope('dga', { include: [{ model: models.Dga, as: 'dga' }] });
    models.SampleInfo.belongsTo(models.Diag, { foreignKey: 'lab_report_number', sourceKey: 'lab_report_number', as: 'diag' });
    models.SampleInfo.addScope('diag', { include: [{ model: models.Diag, as: 'diag' }] });
  }
}
SampleInfo.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true
  },
  equipment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: EQUIPMENT
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
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
    // allowNull: false,
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
  serial_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  appr_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: APPRTYPE
      },
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
  appr_type_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  equipment_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  division_name: {
    type: DataTypes.STRING,
    // allowNull: false
  },
  sample_date: {
    type: DataTypes.DATE
  },
  lab_report_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tank: {
    type: DataTypes.STRING
  },
  sample_pt: {
    type: DataTypes.STRING
  },
  lab_recv_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  lab_test_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ship_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  job_number: {
    type: DataTypes.STRING,
    allowNull: true
  },
  order_number: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sample_r: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fluid_temperature: {
    type: DataTypes.STRING,
    allowNull: true
  },
  amb_temperature: {
    type: DataTypes.STRING,
    allowNull: true
  },
  weather: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pv_gauge: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lvl_gauge: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rlf_vlv_clr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  oil_leak: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ground_status: {
    type: DataTypes.STRING,
    allowNull: true
  },
  paint: {
    type: DataTypes.STRING,
    allowNull: true
  },
  breather: {
    type: DataTypes.STRING,
    allowNull: true
  },
  corrosion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  desiccant: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ops_count: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lab_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  is_base: {
    type: DataTypes.STRING,
    allowNull: true
  },
  exclude: {
    type: DataTypes.STRING,
    allowNull: true
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true
  },
  first_report_date: {
    type: DataTypes.DATE,
    allowNull: false
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
  modelName: 'SampleInfo',
  tableName: SAMPLEINFO,
  timestamps: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
});

module.exports = SampleInfo;