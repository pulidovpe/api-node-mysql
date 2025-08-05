"use strict";

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// index.js  -  sequelize
var _require = require('../config/config'),
    db = _require.db;

var database = {};
var sequelize = new _sequelize["default"](db.name, db.user, db.pass, {
  dialect: 'mysql',
  host: db.host,
  port: db.port,
  logging: false
});
database.sequelize = sequelize;
database.Sequelize = _sequelize["default"];
module.exports = database;