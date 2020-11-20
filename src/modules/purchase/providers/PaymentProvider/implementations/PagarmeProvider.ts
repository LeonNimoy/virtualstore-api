import pagarme from 'pagarme';

import Transaction from '@modules/purchase/infra/databases/entities/Transaction';
import ICheckoutDTO from '@modules/purchase/dtos/ICheckoutDTO';
import AppError from '@shared/errors/AppError';
import IPaymentProvider from '../entities/IPaymentProvider';

class PagarmeProvider implements IPaymentProvider {
  public async createTransaction({
    amount,
    cardHash,
    userData,
    addressData,
    productsWithValidFormat,
  }: ICheckoutDTO): Promise<Transaction> {
    const client = await pagarme.client.connect({
      api_key: process.env.PAGARME_API_KEY,
    });

    if (amount === undefined)
      throw new AppError('Valor inválido para transação');
    if (userData === undefined)
      throw new AppError('Usuário inválido para transação');
    if (addressData === undefined)
      throw new AppError('Endereço inválido para transação');
    if (cardHash === undefined)
      throw new AppError('Dados do cartão inválidos para transação');
    if (productsWithValidFormat === undefined)
      throw new AppError('Dados do carrinho inválidos para transação');

    const pagarmeTransaction = await client.transactions.create({
      amount,
      card_hash: cardHash,
      customer: {
        external_id: userData.id!,
        name: userData.name,
        type: 'individual',
        country: 'br',
        email: userData.email,
        documents: [
          {
            type: 'cpf',
            number: String(userData.cpf),
          },
        ],
        phone_numbers: [`+55${userData.phone}`],
      },
      billing: {
        name: userData.name,
        address: {
          country: 'br',
          state: addressData.state,
          city: addressData.city,
          neighborhood: addressData.neighborhood,
          street: addressData.address,
          street_number: String(addressData.address_number),
          complementary: addressData.address_complement,
          zipcode: addressData.cep,
        },
      },
      shipping: {
        name: userData.name,
        fee: 1000,
        delivery_date: '2000-12-21',
        expedited: true,
        address: {
          country: 'br',
          state: addressData.state,
          city: addressData.city,
          neighborhood: addressData.neighborhood,
          street: addressData.address,
          street_number: String(addressData.address_number),
          complementary: addressData.address_complement,
          zipcode: addressData.cep,
        },
      },
      items: productsWithValidFormat,
    });

    console.log(pagarmeTransaction);

    return pagarmeTransaction;
  }
}

export default PagarmeProvider;
