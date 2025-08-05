"use strict";

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _require = require('../config/config'),
    secret = _require.app.secret;

var BCRYPT_SALT_ROUNDS = 12;
/*
   response code
   -------------
   code: Message
   1   : Username or Email already taken
   2   : User does not exist
   3   : Passwords do not match
   4   : Fullname is required
*/
// const Op = Sequelize.Op;

var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

var JWTstrategy = require('passport-jwt').Strategy;

var ExtractJWT = require('passport-jwt').ExtractJwt;

var User = require('./sequelize');

passport.use('register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
}, function (req, email, password, done) {
  console.log(email);
  console.log(req.body.fullname);

  try {
    if (!req.body.fullname) {
      return done(null, false, {
        code: 4,
        message: 'Fullname is required'
      });
    }

    User.findOne({
      where: {
        email: email
      }
    }).then(function (user) {
      if (user != null) {
        console.log('Username or Email already taken');
        return done(null, false, {
          code: 1,
          message: "Username or Email already taken"
        });
      }

      _bcryptjs["default"].hash(password, BCRYPT_SALT_ROUNDS).then(function (hashedPassword) {
        User.create({
          password: hashedPassword,
          name: req.body.fullname,
          email: email
        }).then(function (user) {
          console.log('user created');
          return done(null, user);
        });
      });
    });
  } catch (err) {
    return done(err);
  }
}));
passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, function (email, password, done) {
  try {
    User.findOne({
      where: {
        email: email
      }
    }).then(function (user) {
      if (user === null) {
        return done(null, false, {
          code: 2,
          message: "User does not exists"
        });
      }

      _bcryptjs["default"].compare(password, user.password).then(function (response) {
        if (response !== true) {
          console.log('passwords do not match');
          return done(null, false, {
            code: 3,
            message: 'Passwords do not match'
          });
        }

        console.log('User found & authenticated');
        return done(null, user);
      });
    });
  } catch (err) {
    done(err);
  }
}));
var opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: secret
};
passport.use('jwt', new JWTstrategy(opts, function (jwt_payload, done) {
  try {
    User.findOne({
      where: {
        id: jwt_payload.id
      }
    }).then(function (user) {
      if (user) {
        console.log('User found in db in passport');
        done(null, user);
      } else {
        console.log('Wrong credential');
        done(null, false, {
          code: 2,
          message: 'Wrong credential'
        });
      }
    });
  } catch (err) {
    done(err);
  }
}));