'use strict';
const { REPORT_REMARK, USERS, APPRTYPE } = require('../constants/tables.constants');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database');

class Report_remark extends Model {
    static associate(models) {
        models.Report_remark.belongsTo(models.User, { foreignKey: 'created_by', targetKey: 'id', as: 'users' });
        models.Report_remark.addScope('user', { include: [{ model: models.User, as: 'users' }] });
    }
}
Report_remark.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    lab_report_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    equipment_type: {
        type: String,
        allowNull: false
    },
    reliability: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hazards: {
        type: DataTypes.STRING,
        allowNull: false
    },
    moisture_dynamics: {
        type: DataTypes.STRING,
        allowNull: false
    },
    oil_reconditioning: {
        type: DataTypes.STRING,
        allowNull: false
    },
    oil_replacement: {
        type: DataTypes.STRING,
        allowNull: false
    },
    next_tests: {
        type: DataTypes.STRING,
        allowNull: true
    },
    next_sample_date: {
        type: 'TIMESTAMP',
        allowNull: true
    },
    comments: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    action_items: {
        type: DataTypes.TEXT,
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
        type: 'TIMESTAMP'
    },
    updated_at: {
        allowNull: false,
        type: 'TIMESTAMP'
    },
    deleted_at: {
        type: 'TIMESTAMP'
    }
}, {
    sequelize,
    modelName: 'Report_remark',
    tableName: REPORT_REMARK,
    timestamps: true,
    underscored: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
});

module.exports = Report_remark;