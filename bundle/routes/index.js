"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// index.js

const router = _express.default.Router();
router.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.json({
    response: 'Express RESTful API'
  });
});
var _default = exports.default = router;