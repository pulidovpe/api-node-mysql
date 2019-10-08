"use strict";

// logoutUser.js
module.exports = function (app) {
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
};