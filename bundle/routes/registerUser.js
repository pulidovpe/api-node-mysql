"use strict";

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// registerUser.js
var User = require('../middlewares/sequelize');

module.exports = function (app) {
  app.post('/registerUser', function (req, res, next) {
    _passport["default"].authenticate('register', function (err, user, info) {
      if (err) {
        console.error(err);
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
        res.status(409).json(info);
      } else {
        req.logIn(user, function (error) {
          var dataUser = {
            name: req.body.fullname,
            email: req.body.email
          };
          User.findOne({
            where: {
              email: dataUser.email
            }
          }).then(function (user) {
            user.update({
              name: dataUser.name,
              email: dataUser.email
            }).then(function () {
              console.log('user created in db');
              dataUser.createdAt = user.createdAt;
              res.status(201).json({
                dataUser: dataUser,
                message: 'User created'
              });
            });
          });
        });
      }
    })(req, res, next);
  });
};
/* const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
   res.setHeader('Content-Type', 'text/plain; charset=utf-8');
   res.end('Express RESTful API');
   // res.render('index.hbs')
});

module.exports = router; */