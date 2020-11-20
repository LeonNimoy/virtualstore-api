import { Request, Response } from 'express';

import TransactionsRepository from '@modules/purchase/repositories/TransactionsRepository';

export default class TransactionsController {
  public async list(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { transaction_id } = req.query;

    const transactionIdAsString = String(transaction_id);

    const transactionRepository = new TransactionsRepository();
    let userTransaction;

    !transaction_id
      ? (userTransaction = await transactionRepository.listTransactions(id))
      : (userTransaction = await transactionRepository.listOneTransaction(
          transactionIdAsString,
        ));

    return res.status(200).json(userTransaction);
  }
}
