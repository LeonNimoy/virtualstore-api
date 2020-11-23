"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _FreteController = _interopRequireDefault(require("../../controllers/FreteController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fretesRouter = (0, _express.Router)();
const freteController = new _FreteController.default();
fretesRouter.get('/', freteController.search);
var _default = fretesRouter;
exports.default = _default;