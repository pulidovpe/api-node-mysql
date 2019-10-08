"use strict";

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _require = require('../config/config'),
    secret = _require.app.secret;

var User = require('../middlewares/sequelize');

module.exports = function (app) {
  app["delete"]('/deleteUser', function (req, res, next) {
    _passport["default"].authenticate('jwt', {
      session: false
    }, function (err, user, info) {
      if (err) {
        console.error(err);
      }

      if (!req.body.email) {
        return res.status(422).json({
          message: 'Email is required'
        });
      }

      if (user.email !== req.body.email) {
        return res.status(401).json({
          message: 'Unauthorized. Wrong credential'
        });
      }

      if (info !== undefined) {
        console.error('info');
        console.error(info);
        res.status(403).json(info);
      } else {
        User.destroy({
          where: {
            email: req.body.email
          }
        }).then(function (userInfo) {
          if (userInfo === 1) {
            console.log('user deleted from db');
            console.log('userInfo', userInfo);
            res.status(204).send({
              message: 'User deleted'
            }); //req.logout();
          } else {
            console.error('user does not exists');
            res.status(404).json({
              message: 'User does not exists'
            });
          }
        })["catch"](function (err) {
          console.log("message: ".concat(err.message));
          res.status(500).json(err);
        });
      }
    })(req, res, next);
  });
};