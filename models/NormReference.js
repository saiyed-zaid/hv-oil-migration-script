'use strict';
const { NORM_REFERENCE, USERS } = require('../constants/tables.constants');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database');

class Norm_reference extends Model {
    static associate(models) {

    }
}
Norm_reference.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    norm_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    element_variable: {
        type: DataTypes.STRING,
        allowNull: false
    },
    element_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alert_min: {
        type: DataTypes.DOUBLE(10, 2),
        allowNull: false
    },
    alert_max: {
        type: DataTypes.DOUBLE(10, 2),
        allowNull: false,
    },
    warn_min: {
        type: DataTypes.DOUBLE(10, 2),
        allowNull: false
    },
    warn_max: {
        type: DataTypes.DOUBLE(10, 2),
        allowNull: false
    },
    alarm_min: {
        type: DataTypes.DOUBLE(10, 2),
        allowNull: false
    },
    alarm_max: {
        type: DataTypes.DOUBLE(10, 2),
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: USERS,
            },
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
    },
}, {
    sequelize,
    modelName: 'Norm_reference',
    tableName: NORM_REFERENCE,
    timestamps: true,
    underscored: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

module.exports = Norm_reference;