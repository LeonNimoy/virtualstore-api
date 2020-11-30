import TransactionSchema from '../infra/databases/mongoose/schemas/TransactionSchema';
import Transaction from '../infra/databases/entities/Transaction';
import ITransactionDTO from '../dtos/ITransactionDTO';
import ITransactionProvider from '../providers/ITransactionProvider';

export default class TransactionsRepository implements ITransactionProvider {
  public async listTransactions(
    customer_email: string,
  ): Promise<Transaction[] | null> {
    const userTransactions = await TransactionSchema.find({
      'customer.external_id': customer_email,
    });

    return userTransactions;
  }

  public async listOneTransaction(
    transaction_id: string,
  ): Promise<Transaction | null> {
    const userTransaction = await TransactionSchema.findById(transaction_id);

    return userTransaction;
  }

  public async saveTransaction(
    transactionData: ITransactionDTO,
  ): Promise<Transaction> {
    const transactionCreated = new TransactionSchema(transactionData);
    const userTransaction = await transactionCreated.save();
    return userTransaction;
  }
}
