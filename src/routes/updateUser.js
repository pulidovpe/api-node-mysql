// updateUser.js
import passport from 'passport';
import User from '../middlewares/sequelize.js';

export default app => {
   app.put('/updateUser', (req, res, next) => {
      passport.authenticate('jwt', { session: false }, (err, user, info) => {
         if (err) {
            console.error(err);
         }
         if (!req.body.email) {
            return res.status(422).json({ message: 'Email is required' });
         }
         if (!req.body.fullname) {
            return res.status(422).json({ message: 'Fullname is required' });
         }
         const dataUser = {
            name: req.body.fullname,
            email: req.body.email
         };
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
                  userInfo
                     .update({
                        name: req.body.fullname,
                        email: req.body.email
                     })
                     .then(() => {
                        console.log('user updated');
                        dataUser.updatedAt = user.updatedAt;
                        res.status(200).json({ dataUser, auth: true, message: 'User updated' });
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
