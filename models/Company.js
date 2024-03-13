'use strict';
const { USERS, COMPANIES, LOCATIONS } = require('../constants/tables.constants');
const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../services/database');

class Company extends Model {
  static associate(models) {
    models.Company.belongsTo(models.Location, { foreignKey: 'location_id', targetKey: 'id', as: 'location' });
    models.Company.addScope('location', { include: [{ model: models.Location, as: 'location' }] });

    models.Company.hasMany(models.Division, { foreignKey: 'company_id', sourceKey: 'id', as: 'divisions' });
    models.Company.addScope('division', { include: [{ model: models.Division, as: 'divisions' }] });
    models.Company.addScope('counts', (company_id = null) => ( {  
      attributes: {
        include: [
          [Sequelize.literal(`(SELECT COUNT(*) FROM \`hv_divisions\` WHERE company_id = ${company_id} AND deleted_at IS NULL )`), 'division_count'],
          [Sequelize.literal(`(SELECT COUNT(*) FROM \`hv_users\` WHERE company_id = ${company_id} AND deleted_at IS NULL )`), 'user_count'],
          [Sequelize.literal(`(SELECT COUNT(*) FROM \`hv_shippings\` WHERE company_id = ${company_id} AND syringe_number IS NOT NULL AND status = 'shipped' AND deleted_at IS NULL )`), 'syringe_count'],
          [Sequelize.literal(`(SELECT COUNT(*) FROM \`hv_shippings\` WHERE company_id = ${company_id} AND bottle_number IS NOT NULL AND status = 'shipped' AND deleted_at IS NULL )`), 'bottle_count'],
        ]
      }
    }));
  
    models.Company.hasMany(models.User, { foreignKey: 'company_id', sourceKey: 'id', as: 'users' });
  }
}
Company.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true
  },
  company_website: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: {
        tableName: LOCATIONS,
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
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
  }
}, {
  sequelize,
  modelName: 'Company',
  tableName: COMPANIES,
  timestamps: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
});

module.exports = Company;