"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// logoutUser.js
var _default = app => {
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
};
exports.default = _default;