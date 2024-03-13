'use strict';
const { LOCATIONS } = require('../constants/tables.constants');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database');
class Location extends Model {
  static associate(models) {
    models.Location.hasMany(models.Company, { foreignKey: 'location_id', sourceKey: 'id', as: 'companies' });
    models.Location.addScope('company', { include: [{ model: models.Company, as: 'companies' }] });
  }
}
Location.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'Location',
  tableName: LOCATIONS,
  timestamps: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});

module.exports = Location;