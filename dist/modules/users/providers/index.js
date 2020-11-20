"use strict";

var _tsyringe = require("tsyringe");

var _BCryptHashUser = _interopRequireDefault(require("./HashUser/implementations/BCryptHashUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('HashUser', _BCryptHashUser.default);