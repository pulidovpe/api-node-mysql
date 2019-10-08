// config.js
require('dotenv').config();

// Production in Heroku
const prod = {
   app: {
      hostname: process.env.APP_HOST,
      secret: process.env.APP_SECRET,
      port: parseInt(process.env.PORT) || 3000
   },
   db: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      name: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      pass: process.env.DB_PASSWORD
   }
};
// Develop in localhost
const dev = {
   app: {
      hostname: process.env.APP_HOST,
      secret: process.env.APP_SECRET,
      port: parseInt(process.env.APP_PORT)
   },
   db: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      name: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      pass: process.env.DB_PASSWORD
   }
};

module.exports = dev;