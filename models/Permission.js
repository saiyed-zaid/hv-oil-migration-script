'use strict';
const { PERMISSION } = require('../constants/tables.constants');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database');

class Permission extends Model {
  static associate(models) {
    models.Permission.hasMany(models.Role_permission, { foreignKey: 'permission_id' })
    models.Permission.hasMany(models.Permission, { foreignKey: 'parent_id', as: 'parent_details' })
    models.Permission.hasOne(models.Role_permission, { foreignKey: 'permission_id', as: 'allow_permission' })
    models.Permission.hasMany(models.Role_permission, { foreignKey: 'permission_id', as: 'allow_permissions' })
    models.Permission.hasMany(models.Permission, { foreignKey: 'parent_id', as: 'parent_detail' })
    models.Permission.addScope('parent_detail', (role_id = null) => ({
      include: [
        {
          model: models.Permission,
          include: {
            model: models.Role_permission,
            attributes: ["id", "role_id", "permission_id", "is_allow"],
            where: role_id ? {
              role_id: role_id 
            } : {},
            as: 'allow_permissions'
          },
          attributes: ["id", "name", "slug", "parent_id", 'is_visible_ui'],
          as: 'parent_detail'
        }
      ]
    }));
  }
}

Permission.init({
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
    allowNull: true
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: {
        tableName: PERMISSION,
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
  is_visible_ui: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'Permission',
  tableName: PERMISSION,
  timestamps: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});

module.exports = Permission;