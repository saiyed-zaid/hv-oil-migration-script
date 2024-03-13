'use strict';
const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../services/database');

class DatabaseMigration extends Model {
    static associate(models) { }
}
DatabaseMigration.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tableName: {
        type: Sequelize.STRING,
    },
    startTime: {
        type: 'TIMESTAMP',
        defaultValue: null
    },
    endTime: {
        type: 'TIMESTAMP',
        defaultValue: null
    },
    status: {
        type: Sequelize.STRING, // PENDING, IN_PROGRESS, DONE, FAILED
        defaultValue: 'PENDING'
    },
    created_at: {
        type: 'TIMESTAMP',
        allowNull: false
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
    modelName: 'database-migration',
    tableName: 'database-migration',
    timestamps: true,
    // underscored: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

module.exports = DatabaseMigration;