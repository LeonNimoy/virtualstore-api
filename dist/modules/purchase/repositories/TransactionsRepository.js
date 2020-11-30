"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TransactionSchema = _interopRequireDefault(require("../infra/databases/mongoose/schemas/TransactionSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TransactionsRepository {
  async listTransactions(customer_email) {
    const userTransactions = await _TransactionSchema.default.find({
      'customer.external_id': customer_email
    });
    return userTransactions;
  }

  async listOneTransaction(transaction_id) {
    const userTransaction = await _TransactionSchema.default.findById(transaction_id);
    return userTransaction;
  }

  async saveTransaction(transactionData) {
    const transactionCreated = new _TransactionSchema.default(transactionData);
    const userTransaction = await transactionCreated.save();
    return userTransaction;
  }

}

exports.default = TransactionsRepository;