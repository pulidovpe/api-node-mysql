// app.js
import express from 'express';
import createError from 'http-errors';
import cors from 'cors';
import logger from 'morgan';
import passport from 'passport';

const app = express();

// middlewares
// For Passport
require('./middlewares/passport');
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger('dev'));
app.use(passport.initialize());

// routes
app.use('/', require('./routes'));
require('./routes/registerUser')(app);
require('./routes/loginUser')(app);
require('./routes/logoutUser')(app);
require('./routes/updateUser')(app);
require('./routes/updatePassword')(app);
require('./routes/deleteUser')(app);

// error handler 404
app.use(function (req, res, next) {
   return res.status(404).send({ message: 'Route: ' + req.url + ' Not found.' });
   //return res.status(404).json({ error: err.message });
});
// 500 - Any server error
app.use(function (err, req, res, next) {
   return res.status(500).send({ error: err });
});

module.exports = app;