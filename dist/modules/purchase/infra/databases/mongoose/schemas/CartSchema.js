"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = new _mongoose.default.Schema({
  user_id: {
    type: String,
    unique: true,
    required: true
  },
  products: [String],
  status: {
    type: String
  },
  created_at: {
    type: String
  },
  updated_at: {
    type: String
  }
}, {
  toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

const CartSchema = _mongoose.default.model('Cart', schema);

var _default = CartSchema;
exports.default = _default;