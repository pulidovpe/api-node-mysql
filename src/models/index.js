// index.js  -  sequelize
import Sequelize from 'sequelize';
const { db } = require('../config/config');
const database = {};

const sequelize = new Sequelize(db.name, db.user, db.pass,{
   dialect: 'mysql',
   host: db.host,
   port: db.port,
   logging: false
});

database.sequelize = sequelize;
database.Sequelize = Sequelize;

module.exports = database;
