"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _passport = _interopRequireDefault(require("passport"));
var _sequelize = _interopRequireDefault(require("../middlewares/sequelize.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// registerUser.js
var _default = app => {
  app.post('/registerUser', (req, res, next) => {
    _passport.default.authenticate('register', (err, user, info) => {
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
        req.logIn(user, error => {
          const dataUser = {
            name: req.body.fullname,
            email: req.body.email
          };
          _sequelize.default.findOne({
            where: {
              email: dataUser.email
            }
          }).then(user => {
            user.update({
              name: dataUser.name,
              email: dataUser.email
            }).then(() => {
              console.log('user created in db');
              dataUser.createdAt = user.createdAt;
              res.status(201).json({
                dataUser,
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
exports.default = _default;