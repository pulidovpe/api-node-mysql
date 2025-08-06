#!/usr/bin/env node

/**
 * Module dependencies.
 */
"use strict";

var _app = _interopRequireDefault(require("../app.js"));
var _debug = _interopRequireDefault(require("debug"));
var _http = _interopRequireDefault(require("http"));
var _config = _interopRequireDefault(require("../config/config.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const debugServer = (0, _debug.default)('api-node-mysql:server');
const {
  app: {
    hostname,
    port
  }
} = _config.default;

/**
 * Create HTTP server.
 */
const server = _http.default.createServer(_app.default);

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
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

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
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debugServer('Listening on ' + bind);
}