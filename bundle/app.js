"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _passport = _interopRequireDefault(require("passport"));
var _index = _interopRequireDefault(require("./routes/index.js"));
var _registerUser = _interopRequireDefault(require("./routes/registerUser.js"));
var _loginUser = _interopRequireDefault(require("./routes/loginUser.js"));
var _logoutUser = _interopRequireDefault(require("./routes/logoutUser.js"));
var _updateUser = _interopRequireDefault(require("./routes/updateUser.js"));
var _updatePassword = _interopRequireDefault(require("./routes/updatePassword.js"));
var _deleteUser = _interopRequireDefault(require("./routes/deleteUser.js"));
var _getAllUsers = _interopRequireDefault(require("./routes/getAllUsers.js"));
require("./middlewares/passport.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// app.js

// Import passport middleware

const app = (0, _express.default)();

// middlewares
app.use((0, _cors.default)());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use(_express.default.json());
app.use((0, _morgan.default)('dev'));
app.use(_passport.default.initialize());

// routes
app.use('/', _index.default);
(0, _registerUser.default)(app);
(0, _loginUser.default)(app);
(0, _logoutUser.default)(app);
(0, _updateUser.default)(app);
(0, _updatePassword.default)(app);
(0, _deleteUser.default)(app);
(0, _getAllUsers.default)(app);

// error handler 404
app.use(function (req, res, next) {
  return res.status(404).send({
    message: 'Route: ' + req.url + ' Not found.'
  });
  //return res.status(404).json({ error: err.message });
});
// 500 - Any server error
app.use(function (err, req, res, next) {
  return res.status(500).send({
    error: err
  });
});
var _default = exports.default = app;