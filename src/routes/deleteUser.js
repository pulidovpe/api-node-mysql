import passport from 'passport';
const { app: { secret } } = require('../config/config');
const User = require('../middlewares/sequelize');

module.exports = app => {
  app.delete('/deleteUser', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        console.error(err);
      }
      if (!req.body.email) {
        return res.status(422).json({ message: 'Email is required' });
      }
      if (user.email !== req.body.email) {
        return res.status(401).json({ message: 'Unauthorized. Wrong credential' });
      }
      if (info !== undefined) {
        console.error('info');
        console.error(info);
        res.status(403).json(info);
      } else {
        User.destroy({
          where: {
            email: req.body.email,
          },
        })
          .then((userInfo) => {
            if (userInfo === 1) {
              console.log('user deleted from db');              
              console.log('userInfo',userInfo);            
              res.status(204).send({ message: 'User deleted' });
              //req.logout();
            } else {
              console.error('user does not exists');
              res.status(404).json({ message: 'User does not exists' });
            }
          })
          .catch((err) => {
            console.log(`message: ${err.message}`);
            res.status(500).json(err);
          });
      }
    })(req, res, next);
  });
};