'use strict';
const { USERS, COMPANIES, DIVISIONS, LOCATIONS, ROLE } = require('../constants/tables.constants');
const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../services/database');

class User extends Model {
  static associate(models) {
    models.User.belongsTo(models.Role, { foreignKey: 'role_id', targetKey: 'id', as: 'role_permission' });
    models.User.addScope('role_permission', (role_id = null) => ({
      include: [
        {
          model: models.Role,
          include: [
            {
              model: models.Role_permission,
              include: {
                model: models.Permission,
                where: { parent_id: null },
                include: {
                  model: models.Permission,
                  include: {
                    model: models.Role_permission,
                    where: { role_id: role_id },
                    as: 'allow_permission'
                  },
                  as: 'parent_details'
                },
                as: 'permission'
              },
              as: 'role_details'
            }
          ],
          as: 'role_permission'
        }]
    }));

    models.User.belongsTo(models.Role, { foreignKey: 'role_id', targetKey: 'id', as: 'permission_list' });
    models.User.addScope('permission_list', {
      include: [
        {
          model: models.Role,
          include: [
            {
              model: models.Role_permission,
              include: {
                model: models.Permission,
                where: { parent_id: null },
                include: {
                  model: models.Permission,
                  include: {
                    model: models.Role_permission,
                    as: 'allow_permissions'
                  },
                  as: 'parent_details'
                },
                as: 'permission'
              },
              as: 'role_details'
            }
          ],
          as: 'role_permission'
        }]
    });

    models.User.belongsTo(models.Role, { foreignKey: 'role_id', targetKey: 'id', as: 'roles' });
    models.User.addScope('role', { include: [{ model: models.Role, attributes: ["id", "name", "is_hvoil_role"], as: 'roles' }] });
    models.User.belongsTo(models.Location, { foreignKey: 'location_id', targetKey: 'id', as: 'location' });
    models.User.addScope('location', { include: [{ model: models.Location, attributes: ["id", "name"], as: 'location' }] });
    models.User.belongsTo(models.Division, { foreignKey: 'division_id', targetKey: 'id', as: 'division' });
    models.User.addScope('division', { include: [{ model: models.Division, attributes: ["id", "name"], as: 'division' }] });
    models.User.belongsTo(models.Company, { foreignKey: 'company_id', targetKey: 'id', as: 'company' });
    models.User.addScope('company', { include: [{ model: models.Company, attributes: ["id", "name"], as: 'company', include: [{ model: models.Location, attributes: ["id", "name"], as: 'location' }] }] });

    models.User.hasMany(models.Report_remark, { as: 'users', foreignKey: 'created_by' });
  }
}
User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: {
        tableName: ROLE,
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
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
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: {
        tableName: COMPANIES,
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
  division_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: {
        tableName: DIVISIONS,
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  failed_login_attempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 6
    }
  },
  try_after: {
    type: 'TIMESTAMP'
  },
  status: {
    type: DataTypes.ENUM({
      values: ['active', 'in-active']
    }),
    defaultValue: 'active',
    allowNull: false
  },
  is_new_user: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
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
    type: 'TIMESTAMP'
  },
  updated_at: {
    type: 'TIMESTAMP'
  },
  deleted_at: {
    type: 'TIMESTAMP'
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: USERS,
  timestamps: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  defaultScope: {
    attributes: {
      exclude: ['password']
    }
  }
});


module.exports = User;