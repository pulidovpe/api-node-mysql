"use strict";

// Database connection
// Models
var _require = require('../config/config'),
    name = _require.db.name;

var db = require("../models");

var UserModel = require("../models/user");

var User = UserModel(db.sequelize, db.Sequelize); // Sync Database

db.sequelize.sync().then(function () {
  console.log("DB ".concat(name, " is connected"));
})["catch"](function (err) {
  console.error('Unable to connect to the database:', err);
});
module.exports = User;