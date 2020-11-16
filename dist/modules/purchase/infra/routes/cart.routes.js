"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../users/middlewares/ensureAuthenticated"));

var _CartsController = _interopRequireDefault(require("../../controllers/CartsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cartsRouter = (0, _express.Router)();
const cartsController = new _CartsController.default();
cartsRouter.put('/', _ensureAuthenticated.default, cartsController.update);
var _default = cartsRouter;
exports.default = _default;