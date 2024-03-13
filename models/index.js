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
db.Request_shipping = require('./Request-shipping')
db.Role = require('./Role')
db.Role_permission = require('./Role_permission')
db.SampleInfo = require('./SampleInfo')
db.DgaInfo = require('./DgaInfo')
db.Report_remark = require('./Report-remark')

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
module.exports = db;
