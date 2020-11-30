import { Request, Response } from 'express';

import TransactionsRepository from '@modules/purchase/repositories/TransactionsRepository';

export default class TransactionsController {
  public async list(req: Request, res: Response): Promise<Response> {
    const { transaction_id, user_email } = req.query;

    const transactionIdAsString = String(transaction_id);
    const transactionEmailAsString = String(user_email);

    const transactionRepository = new TransactionsRepository();
    let userTransaction;

    user_email
      ? (userTransaction = await transactionRepository.listTransactions(
          transactionEmailAsString,
        ))
      : (userTransaction = await transactionRepository.listOneTransaction(
          transactionIdAsString,
        ));

    return res.status(200).json(userTransaction);
  }
}
