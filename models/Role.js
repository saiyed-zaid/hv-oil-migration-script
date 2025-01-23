'use strict';
const { ROLE } = require('../constants/tables.constants');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database');
class Role extends Model {
  static associate(models) {
    models.Role.hasMany(models.Role_permission, { foreignKey: 'role_id', as: 'role_details'})
    models.Role.hasMany(models.User, { foreignKey: 'role_id', as: 'roles'})
    models.Role.addScope('user',  { include: [{ model: models.User, attributes: [],  required: false, as: 'roles' }] });
  }
}
Role.init({
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
  is_hvoil_role: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'Role',
  tableName: ROLE,
  timestamps: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});

module.exports = Role;