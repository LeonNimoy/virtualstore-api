"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _FretesController = _interopRequireDefault(require("../../controllers/FretesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fretesRouter = (0, _express.Router)();
const fretesController = new _FretesController.default();
fretesRouter.get('/', fretesController.search);
var _default = fretesRouter;
exports.default = _default;