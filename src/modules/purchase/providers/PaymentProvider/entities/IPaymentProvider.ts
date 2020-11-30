import ICheckoutDTO from '@modules/purchase/dtos/ICheckoutDTO';
import Transaction from '@modules/purchase/infra/databases/entities/Transaction';

export default interface IPaymentProvider {
  createTransaction({
    amount,
    userData,
    productData,
  }: ICheckoutDTO): Promise<Transaction | void>;
  // refundTransaction(transactionId: string): Promise<void>;
}
