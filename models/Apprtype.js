'use strict';
const { APPRTYPE } = require('../constants/tables.constants');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database');

class Apprtype extends Model {
    static associate(models) {

    }
}
Apprtype.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Apprtype',
    tableName: APPRTYPE,
    timestamps: true,
    underscored: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

module.exports = Apprtype;