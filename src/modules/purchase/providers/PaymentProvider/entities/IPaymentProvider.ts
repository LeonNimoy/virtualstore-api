import ICheckoutDTO from '@modules/purchase/dtos/ICheckoutDTO';

export default interface IPaymentProvider {
  createTransaction({
    amount,
    cardHash,
    userData,
    addressData,
    productData,
  }: ICheckoutDTO): Promise<void>;
  // refundTransaction(transactionId: string): Promise<void>;
}
