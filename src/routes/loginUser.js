import jwt from 'jsonwebtoken';
import passport from 'passport';
import express from 'express';
const { app: { secret } } = require('../config/config');
import User from '../middlewares/sequelize';

/*
   passport code to login
   code:
   1: Username or Email already taken
   2: User does not exist
   3: Passwords do not match
   4: Fullname is required
*/

module.exports = app => {
   app.post('/loginUser', (req, res, next) => {
      passport.authenticate('login', (err, users, info) => {
         if (err) {
            console.error(`error ${err}`);
         }
         if (!req.body.email) {
            return res.status(422).json({ message: 'Email is required' });
         }
         if (!req.body.password) {
            return res.status(422).json({ message: 'Password is required' });
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
               User.findOne({
                  where: {
                     email: req.body.email,
                  },
               }).then(user => {                  
                  const expiresIn = 24 * 60 * 60;
                  const accessToken = jwt.sign({ id: user.id }, secret, {
                     expiresIn: expiresIn
                  });
                  const dataUser = {
                     name: user.name,
                     email: user.email,
                     accessToken: accessToken,
                     expiresIn: expiresIn
                  };
                  res.status(200).json({ auth: true, dataUser, message: 'User found & logged in' });
               });
            });
         }
      })(req, res, next);
   });
};
