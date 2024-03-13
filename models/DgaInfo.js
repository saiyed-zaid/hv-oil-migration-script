'use strict';
// [DEPRECATED]
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database');

class DgaInfo extends Model {
  static associate(models) {
  }
}
DgaInfo.init({
  sammple_data: { type: 'TIMESTAMP' },
  lab_report_number: { type: DataTypes.STRING },
  H2: { type: DataTypes.STRING },
  O2: { type: DataTypes.STRING },
  N2: { type: DataTypes.STRING },
  CH4: { type: DataTypes.STRING },
  CO: { type: DataTypes.STRING },
  CO2: { type: DataTypes.STRING },
  C2H4: { type: DataTypes.STRING },
  C2H6: { type: DataTypes.STRING },
  C2H2: { type: DataTypes.STRING },
  userId: { type: DataTypes.STRING }
}, {
  sequelize,
  modelName: 'DgaInfo',
  tableName: 'hv_dga_info',
  timestamps: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
});

module.exports = DgaInfo;


