"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = new _mongoose.default.Schema({
  guestToken: {
    type: String,
    unique: true,
    required: true
  },
  products: [{
    id: String,
    title: String,
    unit_price: Number,
    quantity: Number,
    tangible: Boolean,
    image: String
  }],
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

const GuestCartSchema = _mongoose.default.model('GuestCart', schema);

var _default = GuestCartSchema;
exports.default = _default;