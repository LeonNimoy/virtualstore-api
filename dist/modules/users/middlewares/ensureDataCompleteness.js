"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureDataCompleteness;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureDataCompleteness(req, res, next) {
  const {
    name,
    email,
    password
  } = req.body;

  if (!email || !password || !name) {
    throw new _AppError.default('Por favor, preencha todos os campos', 401);
  }

  return next();
}