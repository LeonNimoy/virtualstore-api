"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _UsersController = _interopRequireDefault(require("../../controllers/UsersController"));

var _ensureAuthenticated = _interopRequireDefault(require("../../middlewares/ensureAuthenticated"));

var _ensureDataCompleteness = _interopRequireDefault(require("../../middlewares/ensureDataCompleteness"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRouter = (0, _express.Router)();
const userController = new _UsersController.default();
usersRouter.get('/:id?', userController.list);
usersRouter.post('/', _ensureDataCompleteness.default, userController.create);
usersRouter.put('/', _ensureAuthenticated.default, userController.update);
usersRouter.delete('/', _ensureAuthenticated.default, userController.delete);
var _default = usersRouter;
exports.default = _default;