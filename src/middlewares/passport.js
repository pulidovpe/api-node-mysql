import bcrypt from 'bcryptjs';
import Sequelize from 'sequelize';
const { app: { secret } } = require('../config/config');

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

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('./sequelize');

passport.use('register',new LocalStrategy(
      {
         usernameField: 'email',
         passwordField: 'password',
         passReqToCallback: true,
         session: false,
      },
   (req, email, password, done) => {
         console.log(email);
         console.log(req.body.fullname);
         
         try {
            if (!req.body.fullname) {
               return done(null, false, { code: 4, message: 'Fullname is required' });
            }
            User.findOne({
               where: {
                  email,
               },
            }).then(user => {
               if (user != null) {
                  console.log('Username or Email already taken');
                  return done(null, false, { code: 1, message: "Username or Email already taken" });
               }
               bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                  User.create({
                     password: hashedPassword,
                     name: req.body.fullname,
                     email,
                  }).then(user => {
                     console.log('user created');
                     return done(null, user);
                  });
               });
            });
         } catch (err) {
            return done(err);
         }
      },
   ),
);

passport.use('login',new LocalStrategy(
      {
         usernameField: 'email',
         passwordField: 'password',
         session: false,
      },
      (email, password, done) => {
         try {
            User.findOne({
               where: {
                  email,
               },
            }).then(user => {
               if (user === null) {
                  return done(null, false, { code: 2, message: "User does not exists" });
               }
               bcrypt.compare(password, user.password).then(response => {
                  if (response !== true) {
                     console.log('passwords do not match');
                     return done(null, false, { code: 3, message: 'Passwords do not match' });
                  }
                  console.log('User found & authenticated');
                  return done(null, user);
               });
            });
         } catch (err) {
            done(err);
         }
      },
   ),
);

const opts = {
   jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
   secretOrKey: secret,
};

passport.use('jwt',new JWTstrategy(opts, (jwt_payload, done) => {
      try {
         User.findOne({
            where: {
               id: jwt_payload.id,
            },
         }).then(user => {
            if (user) {
               console.log('User found in db in passport');
               done(null, user);
            } else {
               console.log('Wrong credential');
               done(null, false, { code: 2, message: 'Wrong credential' });
            }
         });
      } catch (err) {
         done(err);
      }
   }),
);
