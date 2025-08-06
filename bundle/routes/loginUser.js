"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _passport = _interopRequireDefault(require("passport"));
var _express = _interopRequireDefault(require("express"));
var _config = _interopRequireDefault(require("../config/config.js"));
var _sequelize = _interopRequireDefault(require("../middlewares/sequelize.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  app: {
    secret
  }
} = _config.default;

/*
   passport code to login
   code:
   1: Username or Email already taken
   2: User does not exist
   3: Passwords do not match
   4: Fullname is required
*/
var _default = app => {
  app.post('/loginUser', (req, res, next) => {
    _passport.default.authenticate('login', (err, users, info) => {
      if (err) {
        console.error(`error ${err}`);
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
        req.logIn(users, () => {
          _sequelize.default.findOne({
            where: {
              email: req.body.email
            }
          }).then(user => {
            const expiresIn = 24 * 60 * 60;
            const accessToken = _jsonwebtoken.default.sign({
              id: user.id
            }, secret, {
              expiresIn: expiresIn
            });
            const dataUser = {
              name: user.name,
              email: user.email,
              accessToken: accessToken,
              expiresIn: expiresIn
            };
            res.status(200).json({
              auth: true,
              dataUser,
              message: 'User found & logged in'
            });
          });
        });
      }
    })(req, res, next);
  });
};
exports.default = _default;