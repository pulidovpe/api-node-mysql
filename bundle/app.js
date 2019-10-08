"use strict";

var _express = _interopRequireDefault(require("express"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// app.js
var app = (0, _express["default"])(); // middlewares
// For Passport

require('./middlewares/passport');

app.use((0, _cors["default"])());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"].json());
app.use((0, _morgan["default"])('dev'));
app.use(_passport["default"].initialize()); // routes

app.use('/', require('./routes'));

require('./routes/registerUser')(app);

require('./routes/loginUser')(app);

require('./routes/logoutUser')(app);

require('./routes/updateUser')(app);

require('./routes/updatePassword')(app);

require('./routes/deleteUser')(app); // error handler 404


app.use(function (req, res, next) {
  return res.status(404).send({
    message: 'Route: ' + req.url + ' Not found.'
  }); //return res.status(404).json({ error: err.message });
}); // 500 - Any server error

app.use(function (err, req, res, next) {
  return res.status(500).send({
    error: err
  });
});
module.exports = app;