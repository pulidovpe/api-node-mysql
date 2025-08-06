"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
// user.js
var _default = sequelize => {
  const User = sequelize.define('user', {
    // attributes
    id: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: _sequelize.DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: _sequelize.DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: _sequelize.DataTypes.STRING(255),
      allowNull: false
    },
    remember_token: {
      type: _sequelize.DataTypes.STRING(100)
      // allowNull defaults to true
    },
    resetPasswordToken: _sequelize.DataTypes.STRING,
    resetPasswordExpires: _sequelize.DataTypes.DATE
  }, {
    tableName: 'users',
    timestamps: true
  });
  return User;
};
exports.default = _default;