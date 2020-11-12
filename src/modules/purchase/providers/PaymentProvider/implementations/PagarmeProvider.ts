import pagarme from 'pagarme';

import ICheckoutDTO from '@modules/purchase/dtos/ICheckoutDTO';
import AppError from '@shared/errors/AppError';
import IPaymentProvider from '../entities/IPaymentProvider';

class PagarmeProvider implements IPaymentProvider {
  public async createTransaction({
    amount,
    cardHash,
    userData,
    addressData,
    productData,
  }: ICheckoutDTO): Promise<void> {
    const client = await pagarme.client.connect({
      api_key: process.env.PAGARME_API_KEY,
    });

    if (amount === undefined)
      throw new AppError('Valor inválido para transação', 400);
    if (userData === undefined)
      throw new AppError('Usuário inválido para transação', 400);
    if (addressData === undefined)
      throw new AppError('Endereço inválido para transação', 400);
    if (productData === undefined)
      throw new AppError('Produto inválido para transação', 400);

    await client.transactions.create({
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
        phone_numbers: [`+5531${userData.phone}`],
        birthday: '2000-07-23',
      },
      billing: {
        name: userData.name,
        address: {
          country: 'br',
          state: addressData.state,
          city: addressData.city,
          neighborhood: addressData.neighborhood,
          street: addressData.address,
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
          complementary: addressData.address_complement,
          zipcode: addressData.cep,
        },
      },
      items: [
        {
          id: productData.id!,
          title: productData.name,
          unit_price: 10000,
          quantity: 1,
          tangible: true,
        },
        {
          id: 'b123',
          title: 'Blue pill',
          unit_price: 10000,
          quantity: 1,
          tangible: true,
        },
      ],
    });
  }
}

export default PagarmeProvider;
