"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = _interopRequireDefault(require("../middlewares/sequelize.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// getAllUsers.js
var _default = app => {
  app.get('/getUsers', (req, res) => {
    _sequelize.default.findAll({
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']]
    }).then(users => {
      res.status(200).json({
        success: true,
        message: 'Users retrieved successfully',
        data: users,
        count: users.length
      });
    }).catch(error => {
      console.error('Error getting users:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving users',
        error: error.message
      });
    });
  });
};
exports.default = _default;