"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const TypedPaginateModel = name => (0, _mongoose.model)(name);

var _default = TypedPaginateModel;
exports.default = _default;