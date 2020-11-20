import ICheckoutDTO from '@modules/purchase/dtos/ICheckoutDTO';
import Transaction from '@modules/purchase/infra/databases/entities/Transaction';

export default interface IPaymentProvider {
  createTransaction({
    amount,
    cardHash,
    userData,
    addressData,
    productData,
  }: ICheckoutDTO): Promise<Transaction>;
  // refundTransaction(transactionId: string): Promise<void>;
}
