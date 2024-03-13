'use strict';
const { USERS, FQTABLE, COMPANIES, LOCATIONS, DIVISIONS } = require('../constants/tables.constants');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database');

class Fq extends Model {
    static associate(models) {

    }
}

Fq.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: COMPANIES
            },
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
    },
    division_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: DIVISIONS
            },
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
    },
    location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: LOCATIONS
            },
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    division_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sample_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    lab_report_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    d1816_1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    d1816_2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    d877: {
        type: DataTypes.STRING,
        allowNull: true
    },
    water: {
        type: DataTypes.STRING,
        allowNull: true
    },
    acid_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ift: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pf25: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pf100: {
        type: DataTypes.STRING,
        allowNull: true
    },
    inhibitor_dbp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    inhibitor_dbpc: {
        type: DataTypes.STRING,
        allowNull: true
    },
    visual: {
        type: DataTypes.STRING,
        allowNull: true
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    viscosity: {
        type: DataTypes.STRING,
        allowNull: true
    },
    d1275b: {
        type: DataTypes.STRING,
        allowNull: true
    },
    d130: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sg: {
        type: DataTypes.STRING,
        allowNull: true
    },
    alumi_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    barium: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cadmium: {
        type: DataTypes.STRING,
        allowNull: true
    },
    boron: {
        type: DataTypes.STRING,
        allowNull: true
    },
    calcium: {
        type: DataTypes.STRING,
        allowNull: true
    },
    chromium: {
        type: DataTypes.STRING,
        allowNull: true
    },
    copper: {
        type: DataTypes.STRING,
        allowNull: true
    },
    iron: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lead: {
        type: DataTypes.STRING,
        allowNull: true
    },
    molybde_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    magnesium: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nickel: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phosphorus: {
        type: DataTypes.STRING,
        allowNull: true
    },
    silicon: {
        type: DataTypes.STRING,
        allowNull: true
    },
    silver: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sodium: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tungsten: {
        type: DataTypes.STRING,
        allowNull: true
    },
    zinc: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p4c: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p6c: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p14c: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p21c: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p38c: {
        type: DataTypes.STRING,
        allowNull: true
    },
    a1242: {
        type: DataTypes.STRING,
        allowNull: true
    },
    a1254: {
        type: DataTypes.STRING,
        allowNull: true
    },
    a1260: {
        type: DataTypes.STRING,
        allowNull: true
    },
    total_pcb: {
        type: DataTypes.STRING,
        allowNull: true
    },
    furfural: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mfurfural: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hmfurfural: {
        type: DataTypes.STRING,
        allowNull: true
    },
    furfurylalc: {
        type: DataTypes.STRING,
        allowNull: true
    },
    acetylfuran: {
        type: DataTypes.STRING,
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
        type: DataTypes.DATE
    },
    updated_at: {
        allowNull: false,
        type: DataTypes.DATE
    },
    deleted_at: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: 'Fq',
    tableName: FQTABLE,
    timestamps: true,
    underscored: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

module.exports = Fq;