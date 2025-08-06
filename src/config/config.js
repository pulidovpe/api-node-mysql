// config.js
import dotenv from 'dotenv';
dotenv.config();

// Production in Heroku
const prod = {
   app: {
      hostname: process.env.APP_HOST || 'localhost',
      secret: process.env.APP_SECRET || 'mysecretkey123',
      port: parseInt(process.env.PORT) || 3000
   },
   db: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      name: process.env.DB_DATABASE || 'api_node_mysql',
      user: process.env.DB_USERNAME || 'root',
      pass: process.env.DB_PASSWORD || 'root'
   }
};
// Develop in localhost
const dev = {
   app: {
      hostname: process.env.APP_HOST || 'localhost',
      secret: process.env.APP_SECRET || 'mysecretkey123',
      port: parseInt(process.env.APP_PORT) || 3000
   },
   db: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      name: process.env.DB_DATABASE || 'api_node_mysql',
      user: process.env.DB_USERNAME || 'root',
      pass: process.env.DB_PASSWORD || 'root'
   }
};

// Export based on environment
const config = process.env.NODE_ENV === 'production' ? prod : dev;
export default config;