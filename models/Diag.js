'use strict';
const { USERS, FQTABLE, DGATABLE, DIAGTABLE, COMPANIES, DIVISIONS, LOCATIONS } = require('../constants/tables.constants');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database');

class Diag extends Model {
    static associate(models) {

    }
}

Diag.init({
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
    rel_saturation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dewptc: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dga_retest_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fq_retest_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tdcg: {
        type: DataTypes.STRING,
        allowNull: true
    },
    etcg: {
        type: DataTypes.STRING,
        allowNull: true
    },
    thg: {
        type: DataTypes.STRING,
        allowNull: true
    },
    eshl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    total_gas_content: {
        type: DataTypes.STRING,
        allowNull: true
    },
    o2_n2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    co2_co: {
        type: DataTypes.STRING,
        allowNull: true
    },
    c2h4_c2h2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    c2h6_ch4: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estdp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pf_ratio: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fq_index: {
        type: DataTypes.STRING,
        allowNull: true
    },
    piqr: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pmean: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pmedian: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pq1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pq3: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pskewness: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pstddev: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ptotal: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ovrreli: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gda_remarks: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fq_remarks: {
        type: DataTypes.STRING,
        allowNull: true
    },
    moisture_remarks: {
        type: DataTypes.STRING,
        allowNull: true
    },
    norm_used: {
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
    modelName: 'Diag',
    tableName: DIAGTABLE,
    timestamps: true,
    underscored: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

module.exports = Diag;