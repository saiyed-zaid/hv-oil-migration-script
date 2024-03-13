'use strict';
const { USER_PERMISSION, USERS, PERMISSION, ROLE_PERMISSION, ROLE } = require('../constants/tables.constants');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database');

class Role_permission extends Model {
    static associate(models) {
        models.Role_permission.belongsTo(models.Role, { foreignKey: 'role_id', targetKey: 'id', as: 'roles' });
        models.Role_permission.addScope('role', { include: [{ model: models.Role, as: 'roles' }] });
        models.Role_permission.belongsTo(models.Permission, { foreignKey: 'permission_id', targetKey: 'id', as: 'permission' });
        models.Role_permission.addScope('permission', { include: [{ model: models.Permission, as: 'permission' }] });
        models.Role_permission.belongsTo(models.Permission, { foreignKey: 'permission_id', targetKey: 'id', as: 'apipermissions' });
        models.Role_permission.addScope('apipermissions', (slug = null) => ({ 
            include: [
                { 
                    model: models.Permission, 
                    where: { slug: slug },
                    as: 'apipermissions' 
                }
            ] 
        }));
    }
}

Role_permission.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: ROLE,
            },
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
    },
    permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: PERMISSION,
            },
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
    },
    is_allow: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    sequelize,
    modelName: 'Role_permission',
    tableName: ROLE_PERMISSION,
    timestamps: true,
    underscored: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
});

module.exports = Role_permission;