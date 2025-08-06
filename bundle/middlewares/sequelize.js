"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(require("../config/config.js"));
var _index = _interopRequireDefault(require("../models/index.js"));
var _user = _interopRequireDefault(require("../models/user.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Database connection
// Models

const {
  db: {
    name
  }
} = _config.default;
const User = (0, _user.default)(_index.default.sequelize);

// Test database connection and sync (non-blocking)
setTimeout(() => {
  _index.default.sequelize.authenticate().then(() => {
    console.log(`DB ${name} is connected`);
    // Sync database after successful connection
    _index.default.sequelize.sync({
      force: false
    }).then(() => {
      console.log('Database synchronized successfully');
    }).catch(err => {
      console.error('Error syncing database:', err);
    });
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });
}, 1000);
var _default = exports.default = User;