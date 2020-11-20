"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = new _mongoose.default.Schema({
  customerId: {
    type: String,
    required: true
  },
  amount: {
    type: Number
  },
  cardId: {
    type: String
  },
  productsId: {
    type: [String]
  },
  addressId: {
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

const CheckoutSchema = _mongoose.default.model('Checkout', schema);

var _default = CheckoutSchema;
exports.default = _default;