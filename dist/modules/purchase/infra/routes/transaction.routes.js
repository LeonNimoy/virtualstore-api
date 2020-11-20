"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../users/middlewares/ensureAuthenticated"));

var _TransactionsController = _interopRequireDefault(require("../../controllers/TransactionsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const transactionsRouter = (0, _express.Router)();
const transactionsController = new _TransactionsController.default();
transactionsRouter.get('/', _ensureAuthenticated.default, transactionsController.list);
var _default = transactionsRouter;
exports.default = _default;