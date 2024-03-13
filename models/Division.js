'use strict';
const tableConstants = require('../constants/tables.constants');
const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../services/database');

class Division extends Model {
  static associate(models) {
    models.Division.belongsTo(models.Company, { foreignKey: 'company_id', targetKey: 'id', as: 'company' });
    models.Division.addScope('company', {
      include: [{
        model: models.Company,
        attributes: ["id", "name", "slug"],
        as: 'company',
        include: [{ model: models.Location, attributes: [ "id", "name", "slug"], as: 'location' }]
      }]
    });

    models.Division.addScope('counts', (division_id = null) => ( {  
      attributes: {
        include: [
          [Sequelize.literal(`(SELECT COUNT(*) FROM \`hv_users\` WHERE division_id = ${division_id} AND deleted_at IS NULL )`), 'user_count'],
          [Sequelize.literal(`(SELECT COUNT(*) FROM \`hv_shippings\` WHERE division_id = ${division_id} AND syringe_number IS NOT NULL AND status = 'shipped' AND deleted_at IS NULL )`), 'syringe_count'],
          [Sequelize.literal(`(SELECT COUNT(*) FROM \`hv_shippings\` WHERE division_id = ${division_id} AND bottle_number IS NOT NULL AND status = 'shipped' AND deleted_at IS NULL )`), 'bottle_count'],
        ]
      }
    }));

    models.Division.hasMany(models.Equipment, { foreignKey: 'division_id' });
    models.Division.hasMany(models.SampleInfo, { foreignKey: 'division_id' });
    // models.Division.hasMany(models.Division, { foreignKey: 'division_id', sourceKey: 'id', as: 'divisions' });
    // models.Division.addScope('division', {
    //   include: [{ model: models.Division, as: 'divisions' }]
    // });
  }
}
Division.init({
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
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: tableConstants.COMPANIES,
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
        tableName: tableConstants.LOCATIONS,
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  street1: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  street2: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true
  },
  postalcode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fax: {
    type: DataTypes.STRING,
    allowNull: true
  },
  attention: {
    type: DataTypes.STRING,
    allowNull: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: {
        tableName: tableConstants.USERS,
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
        tableName: tableConstants.USERS,
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  }
}, {
  sequelize,
  modelName: 'Division',
  tableName: tableConstants.DIVISIONS,
  timestamps: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});

module.exports = Division;