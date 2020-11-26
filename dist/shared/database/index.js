"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.close = exports.connect = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.set('runValidators', true); // production: MONGODB_URL - test: MONGODB_TEST


const connect = async () => _mongoose.default.connect(process.env.MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

exports.connect = connect;

const close = () => _mongoose.default.connection.close();

exports.close = close;