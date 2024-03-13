'use strict';
const sequelize = require('../services/database');
// const basename = path.basename(__filename);
const db = {};

db.Location = require('./Location');
db.Apprtype = require('./Apprtype')
db.User = require('./User');
db.Company = require('./Company');
db.Division = require('./Division');
db.Equipment = require('./Equipment')
db.Permission = require('./Permission')
db.Shipping = require('./Shipping');
db.Request_shipping = require('./RequestShipping')
db.Role = require('./Role')
db.Role_permission = require('./RolePermission')
db.SampleInfo = require('./SampleInfo')
db.DgaInfo = require('./DgaInfo')
db.Report_remark = require('./ReportRemark')
db.Tokens = require('./Tokens')

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
module.exports = db;
