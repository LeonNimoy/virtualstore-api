"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.TOKEN_EXPIRE_TIME
  }
};
exports.default = _default;