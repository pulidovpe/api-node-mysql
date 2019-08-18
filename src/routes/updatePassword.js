// updatePassword.js
import passport from 'passport';
import bcrypt from 'bcryptjs';
const User = require('../middlewares/sequelize');

const BCRYPT_SALT_ROUNDS = 12;

module.exports = app => {
   app.put('/updatePassword', (req, res, next) => {
      passport.authenticate('jwt', { session: false }, (err, user, info) => {
         if (err) {
            console.error(err);
         }
         if (!req.body.email) {
            return res.status(422).json({ message: 'Email is required' });
         }
         if (!req.body.newPassword) {
            return res.status(422).json({ message: 'New password is required' });
         }
         if (info !== undefined) {
            console.error(info.message);
            res.status(403).json(info);
         } else {
            User.findOne({
               where: {
                  email: req.body.email,
               },
            }).then((userInfo) => {
               if (userInfo != null) {
                  console.log('user found in db');
                  bcrypt
                     .hash(req.body.newPassword, BCRYPT_SALT_ROUNDS)
                     .then((hashedPassword) => {
                        userInfo.update({
                           password: hashedPassword,
                        });
                     })
                     .then(() => {
                        console.log('password updated');
                        res.status(200).json({ auth: true, message: 'Password updated' });
                     });
               } else {
                  console.error('user does not exists');
                  res.status(404).json({ message: 'User does not exists' });
               }
            });
         }
      })(req, res, next);
   });
};