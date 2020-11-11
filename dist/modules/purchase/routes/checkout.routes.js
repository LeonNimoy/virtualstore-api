"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _CheckoutsController = _interopRequireDefault(require("../controllers/CheckoutsController"));

var _ensureAuthenticated = _interopRequireDefault(require("../../users/middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const checkoutsRouter = (0, _express.Router)();
const checkoutsController = new _CheckoutsController.default();
checkoutsRouter.post('/', _ensureAuthenticated.default, checkoutsController.store);
var _default = checkoutsRouter;
exports.default = _default;