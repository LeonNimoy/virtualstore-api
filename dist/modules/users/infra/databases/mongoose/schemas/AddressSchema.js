"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddressSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = new _mongoose.default.Schema({
  user_id: {
    type: String,
    required: true
  },
  cep: {
    type: String
  },
  address: {
    type: String
  },
  address_number: {
    type: Number
  },
  address_complement: {
    type: String
  },
  neighborhood: {
    type: String
  },
  city: {
    type: String
  },
  state: {
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

const AddressSchema = _mongoose.default.model('Address', schema);

exports.AddressSchema = AddressSchema;