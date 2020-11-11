"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _SessionsController = _interopRequireDefault(require("../../controllers/SessionsController"));

var _ensureAuthenticated = _interopRequireDefault(require("../../middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sessionsRouter = (0, _express.Router)();
const sessionController = new _SessionsController.default();
sessionsRouter.get('/', _ensureAuthenticated.default, sessionController.list);
sessionsRouter.post('/', sessionController.create);
var _default = sessionsRouter;
exports.default = _default;