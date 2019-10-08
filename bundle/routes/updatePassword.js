"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// updatePassword.js
var User = require('../middlewares/sequelize');

var BCRYPT_SALT_ROUNDS = 12;

module.exports = function (app) {
  app.put('/updatePassword', function (req, res, next) {
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

      if (!req.body.newPassword) {
        return res.status(422).json({
          message: 'New password is required'
        });
      }

      if (info !== undefined) {
        console.error(info.message);
        res.status(403).json(info);
      } else {
        User.findOne({
          where: {
            email: req.body.email
          }
        }).then(function (userInfo) {
          if (userInfo != null) {
            console.log('user found in db');

            _bcryptjs["default"].hash(req.body.newPassword, BCRYPT_SALT_ROUNDS).then(function (hashedPassword) {
              userInfo.update({
                password: hashedPassword
              });
            }).then(function () {
              console.log('password updated');
              res.status(200).json({
                auth: true,
                message: 'Password updated'
              });
            });
          } else {
            console.error('user does not exists');
            res.status(404).json({
              message: 'User does not exists'
            });
          }
        });
      }
    })(req, res, next);
  });
};