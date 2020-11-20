import ITransactionDTO from '../dtos/ITransactionDTO';
import Transaction from '../infra/databases/entities/Transaction';

export default interface ITransactionProvider {
  listTransactions(customer_id: string): Promise<Transaction[] | null>;
  listOneTransaction(transaction_id: string): Promise<Transaction | null>;
  saveTransaction(transactionData: ITransactionDTO): Promise<Transaction>;
}
