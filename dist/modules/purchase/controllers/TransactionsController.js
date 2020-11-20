"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TransactionsRepository = _interopRequireDefault(require("../repositories/TransactionsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TransactionsController {
  async list(req, res) {
    const {
      id
    } = req.params;
    const {
      transaction_id
    } = req.query;
    const transactionIdAsString = String(transaction_id);
    const transactionRepository = new _TransactionsRepository.default();
    let userTransaction;
    !transaction_id ? userTransaction = await transactionRepository.listTransactions(id) : userTransaction = await transactionRepository.listOneTransaction(transactionIdAsString);
    return res.status(200).json(userTransaction);
  }

}

exports.default = TransactionsController;