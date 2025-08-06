"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _config = _interopRequireDefault(require("../config/config.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// index.js  -  sequelize

const {
  db
} = _config.default;
const database = {};
const sequelize = new _sequelize.Sequelize(db.name, db.user, db.pass, {
  dialect: 'mysql',
  host: db.host,
  port: db.port,
  logging: false,
  define: {
    timestamps: true,
    underscored: false,
    freezeTableName: true
  }
});
database.sequelize = sequelize;
database.Sequelize = _sequelize.Sequelize;
var _default = exports.default = database;