"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _passport = _interopRequireDefault(require("passport"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _sequelize = _interopRequireDefault(require("../middlewares/sequelize.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// updatePassword.js

const BCRYPT_SALT_ROUNDS = 12;
var _default = app => {
  app.put('/updatePassword', (req, res, next) => {
    _passport.default.authenticate('jwt', {
      session: false
    }, (err, user, info) => {
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
        _sequelize.default.findOne({
          where: {
            email: req.body.email
          }
        }).then(userInfo => {
          if (userInfo != null) {
            console.log('user found in db');
            _bcryptjs.default.hash(req.body.newPassword, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
              userInfo.update({
                password: hashedPassword
              });
            }).then(() => {
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
exports.default = _default;