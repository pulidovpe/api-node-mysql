// index.js  -  sequelize
import { Sequelize } from 'sequelize';
import config from '../config/config.js';

const { db } = config;

const database = {};

const sequelize = new Sequelize(db.name, db.user, db.pass, {
   dialect: 'mysql',
   host: db.host,
   port: db.port,
   logging: false,
   define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true
   }
});

database.sequelize = sequelize;
database.Sequelize = Sequelize;

export default database;
