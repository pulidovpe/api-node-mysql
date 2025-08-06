"use strict";

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _sequelize = require("sequelize");
var _config = _interopRequireDefault(require("../config/config.js"));
var _passport = _interopRequireDefault(require("passport"));
var _passportLocal = _interopRequireDefault(require("passport-local"));
var _passportJwt = _interopRequireDefault(require("passport-jwt"));
var _sequelize2 = _interopRequireDefault(require("./sequelize.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  app: {
    secret
  }
} = _config.default;
const BCRYPT_SALT_ROUNDS = 12;
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

const ExtractJWT = _passportJwt.default.ExtractJwt;
_passport.default.use('register', new _passportLocal.default.Strategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
}, (req, email, password, done) => {
  console.log(email);
  console.log(req.body.fullname);
  try {
    if (!req.body.fullname) {
      return done(null, false, {
        code: 4,
        message: 'Fullname is required'
      });
    }
    _sequelize2.default.findOne({
      where: {
        email
      }
    }).then(user => {
      if (user != null) {
        console.log('Username or Email already taken');
        return done(null, false, {
          code: 1,
          message: "Username or Email already taken"
        });
      }
      _bcryptjs.default.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
        _sequelize2.default.create({
          password: hashedPassword,
          name: req.body.fullname,
          email
        }).then(user => {
          console.log('user created');
          return done(null, user);
        });
      });
    });
  } catch (err) {
    return done(err);
  }
}));
_passport.default.use('login', new _passportLocal.default.Strategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, (email, password, done) => {
  try {
    _sequelize2.default.findOne({
      where: {
        email
      }
    }).then(user => {
      if (user === null) {
        return done(null, false, {
          code: 2,
          message: "User does not exists"
        });
      }
      _bcryptjs.default.compare(password, user.password).then(response => {
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
const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: secret
};
_passport.default.use('jwt', new _passportJwt.default.Strategy(opts, (jwt_payload, done) => {
  try {
    _sequelize2.default.findOne({
      where: {
        id: jwt_payload.id
      }
    }).then(user => {
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