"use strict";

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// updateUser.js
var User = require('../middlewares/sequelize');

module.exports = function (app) {
  app.put('/updateUser', function (req, res, next) {
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

      if (!req.body.fullname) {
        return res.status(422).json({
          message: 'Fullname is required'
        });
      }

      var dataUser = {
        name: req.body.fullname,
        email: req.body.email
      };

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
            userInfo.update({
              name: req.body.fullname,
              email: req.body.email
            }).then(function () {
              console.log('user updated');
              dataUser.updatedAt = user.updatedAt;
              res.status(200).json({
                dataUser: dataUser,
                auth: true,
                message: 'User updated'
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