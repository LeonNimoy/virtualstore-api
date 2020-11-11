"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _AddressesController = _interopRequireDefault(require("../../controllers/AddressesController"));

var _ensureAuthenticated = _interopRequireDefault(require("../../middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addressesRouter = (0, _express.Router)();
const addressesController = new _AddressesController.default();
addressesRouter.get('/', _ensureAuthenticated.default, addressesController.list);
addressesRouter.post('/', _ensureAuthenticated.default, addressesController.create);
addressesRouter.put('/', _ensureAuthenticated.default, addressesController.update);
addressesRouter.delete('/', _ensureAuthenticated.default, addressesController.delete);
var _default = addressesRouter;
exports.default = _default;