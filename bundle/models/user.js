"use strict";

// user.js
module.exports = function (sequelize, type) {
  return sequelize.define('user', {
    // attributes
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: type.STRING(255),
      allowNull: false
    },
    email: {
      type: type.STRING(255),
      allowNull: false
    },
    password: {
      type: type.STRING(255),
      allowNull: false
    },
    remember_token: {
      type: type.STRING(100) // allowNull defaults to true

    },
    resetPasswordToken: type.STRING,
    resetPasswordExpires: type.DATE
  });
};