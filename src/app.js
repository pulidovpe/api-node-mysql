// app.js
import express from 'express';
import createError from 'http-errors';
import cors from 'cors';
import logger from 'morgan';
import passport from 'passport';
import routes from './routes/index.js';
import registerUser from './routes/registerUser.js';
import loginUser from './routes/loginUser.js';
import logoutUser from './routes/logoutUser.js';
import updateUser from './routes/updateUser.js';
import updatePassword from './routes/updatePassword.js';
import deleteUser from './routes/deleteUser.js';

// Import passport middleware
import './middlewares/passport.js';

const app = express();

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger('dev'));
app.use(passport.initialize());

// routes
app.use('/', routes);
registerUser(app);
loginUser(app);
logoutUser(app);
updateUser(app);
updatePassword(app);
deleteUser(app);

// error handler 404
app.use(function (req, res, next) {
   return res.status(404).send({ message: 'Route: ' + req.url + ' Not found.' });
   //return res.status(404).json({ error: err.message });
});
// 500 - Any server error
app.use(function (err, req, res, next) {
   return res.status(500).send({ error: err });
});

export default app;