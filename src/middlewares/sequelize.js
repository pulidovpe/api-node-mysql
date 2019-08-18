// Database connection
// Models
const { db: { name } } = require('../config/config');
const db = require("../models");
const UserModel = require("../models/user");

const User = UserModel(db.sequelize, db.Sequelize);

// Sync Database
db.sequelize.sync().then(function () {
   console.log(`DB ${name} is connected`);
}).catch(function (err) {
   console.error('Unable to connect to the database:', err);
});

module.exports = User;