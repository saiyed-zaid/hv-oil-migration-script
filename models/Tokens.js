'use strict';
const { TOKENS, USERS } = require('../constants/tables.constants');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database');

class Tokens extends Model {
    static associate(models) {}
}
Tokens.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: {
                tableName: USERS,
            },
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    expired_at: {
        type: 'TIMESTAMP',
        allowNull: false
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
    modelName: 'Tokens',
    tableName: TOKENS,
    timestamps: true,
    underscored: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
});

module.exports = Tokens;