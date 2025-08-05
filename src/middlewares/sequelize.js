// Database connection
// Models
import config from '../config/config.js';
import db from "../models/index.js";
import UserModel from "../models/user.js";

const { db: { name } } = config;
const User = UserModel(db.sequelize);

// Sync Database
db.sequelize.sync({ alter: true }).then(function () {
   console.log(`DB ${name} is connected`);
}).catch(function (err) {
   console.error('Unable to connect to the database:', err);
});

export default User;