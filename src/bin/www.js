#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from '../app.js';
import debug from 'debug';
import http from 'http';
import config from '../config/config.js';

const debugServer = debug('api-node-mysql:server');
const { app: { hostname, port } } = config;

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => {
   console.log(`API Restful in http://${hostname}:${port}/`);
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
   if (error.syscall !== 'listen') {
      throw error;
   }

   const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

   // handle specific listen errors with friendly messages
   switch (error.code) {
      case 'EACCES':
         console.error(bind + ' requires elevated privileges');
         process.exit(1);
         break;
      case 'EADDRINUSE':
         console.error(bind + ' is already in use');
         process.exit(1);
         break;
      default:
         throw error;
   }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
   const addr = server.address();
   const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
   debugServer('Listening on ' + bind);
}

module.exports = server;