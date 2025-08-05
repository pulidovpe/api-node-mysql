#!/usr/bin/env node

/**
 * Module dependencies.
 */
"use strict";

require("@babel/polyfill");

var app = require('../app');

var debug = require('debug')('api-node-mysql:server');

var http = require('http');
/**
 * Get port from environment importing config vars.
 */


var config = require('../config/config');

var _config$app = config.app,
    hostname = _config$app.hostname,
    port = _config$app.port;
/**
request.headers.host
 * Create HTTP server.
 */

var server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, function () {
  console.log("API Restful in http://".concat(hostname, ":").concat(port, "/"));
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

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port; // handle specific listen errors with friendly messages

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
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}