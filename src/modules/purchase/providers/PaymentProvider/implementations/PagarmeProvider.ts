/* eslint-disable consistent-return */
import pagarme from 'pagarme';

import Transaction from '@modules/purchase/infra/databases/entities/Transaction';
import ICheckoutDTO from '@modules/purchase/dtos/ICheckoutDTO';
// import AppError from '@shared/errors/AppError';
import IPaymentProvider from '../entities/IPaymentProvider';

class PagarmeProvider implements IPaymentProvider {
  public async createTransaction({
    amount,
    payment_method,
    payment_token,
  }: ICheckoutDTO): Promise<Transaction | void> {
    const client = await pagarme.client.connect({
      api_key: process.env.PAGARME_API_KEY,
    });

    const pagarmeTransaction = await client.transactions
      .capture({
        id: payment_token,
        amount,
        payment_method,
      })
      .catch(error => {
        console.log(error.response.errors);
      });
    return pagarmeTransaction;
  }
}

export default PagarmeProvider;
