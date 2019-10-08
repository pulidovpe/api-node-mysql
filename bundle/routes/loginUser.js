"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _passport = _interopRequireDefault(require("passport"));

var _express = _interopRequireDefault(require("express"));

var _sequelize = _interopRequireDefault(require("../middlewares/sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _require = require('../config/config'),
    secret = _require.app.secret;

/*
   passport code to login
   code:
   1: Username or Email already taken
   2: User does not exist
   3: Passwords do not match
   4: Fullname is required
*/
module.exports = function (app) {
  app.post('/loginUser', function (req, res, next) {
    _passport["default"].authenticate('login', function (err, users, info) {
      if (err) {
        console.error("error ".concat(err));
      }

      if (!req.body.email) {
        return res.status(422).json({
          message: 'Email is required'
        });
      }

      if (!req.body.password) {
        return res.status(422).json({
          message: 'Password is required'
        });
      }

      if (info !== undefined) {
        console.error(info.message);

        if (info.code === 2) {
          res.status(401).json(info);
        }

        if (info.code === 3) {
          res.status(403).json(info);
        }
      } else {
        req.logIn(users, function () {
          _sequelize["default"].findOne({
            where: {
              email: req.body.email
            }
          }).then(function (user) {
            var expiresIn = 24 * 60 * 60;

            var accessToken = _jsonwebtoken["default"].sign({
              id: user.id
            }, secret, {
              expiresIn: expiresIn
            });

            var dataUser = {
              name: user.name,
              email: user.email,
              accessToken: accessToken,
              expiresIn: expiresIn
            };
            res.status(200).json({
              auth: true,
              dataUser: dataUser,
              message: 'User found & logged in'
            });
          });
        });
      }
    })(req, res, next);
  });
};