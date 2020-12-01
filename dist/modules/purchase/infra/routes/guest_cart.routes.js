"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _GuestCartController = _interopRequireDefault(require("../../controllers/GuestCartController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cartsRouter = (0, _express.Router)();
const guests_cartsController = new _GuestCartController.default();
cartsRouter.get('/', guests_cartsController.list);
cartsRouter.post('/', guests_cartsController.create);
cartsRouter.put('/:id', guests_cartsController.update);
var _default = cartsRouter;
exports.default = _default;