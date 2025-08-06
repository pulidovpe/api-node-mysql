// Database connection
// Models
import config from '../config/config.js';
import db from "../models/index.js";
import UserModel from "../models/user.js";

const { db: { name } } = config;
const User = UserModel(db.sequelize);

// Test database connection and sync (non-blocking)
setTimeout(() => {
   db.sequelize.authenticate()
      .then(() => {
         console.log(`DB ${name} is connected`);
         // Sync database after successful connection
         db.sequelize.sync({ force: false })
            .then(() => {
               console.log('Database synchronized successfully');
            })
            .catch((err) => {
               console.error('Error syncing database:', err);
            });
      })
      .catch((err) => {
         console.error('Unable to connect to the database:', err);
      });
}, 1000);

export default User;