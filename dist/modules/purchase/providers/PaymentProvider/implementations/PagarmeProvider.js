"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pagarme = _interopRequireDefault(require("pagarme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable consistent-return */
class PagarmeProvider {
  async createTransaction({
    amount,
    payment_method,
    payment_token
  }) {
    const client = await _pagarme.default.client.connect({
      api_key: process.env.PAGARME_API_KEY
    });
    const pagarmeTransaction = await client.transactions.capture({
      id: payment_token,
      amount,
      payment_method
    }).catch(error => {
      console.log(error.response.errors);
    });
    return pagarmeTransaction;
  }

}

var _default = PagarmeProvider;
exports.default = _default;