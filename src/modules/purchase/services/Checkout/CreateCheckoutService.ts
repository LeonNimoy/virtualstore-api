import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import ICartProvider from '@modules/purchase/providers/ICartProvider';
import IAddressesProvider from '@modules/users/providers/IAddressesProvider';
import IUsersProvider from '@modules/users/providers/IUsersProvider';
import AppError from '@shared/errors/AppError';
import IProductsProvider from '@modules/products/providers/IProductsProvider';
import IPaymentProvider from '../../providers/PaymentProvider/entities/IPaymentProvider';
import ICheckoutDTO from '../../dtos/ICheckoutDTO';

@injectable()
class CreateCheckoutService {
  constructor(
    @inject('PagarmeProvider')
    private pagarmeProvider: IPaymentProvider,

    @inject('UsersRepository')
    private userRepository: IUsersProvider,

    @inject('AddressesRepository')
    private addressRepository: IAddressesProvider,

    @inject('CartsRepository')
    private cartRepository: ICartProvider,

    @inject('ProductsRepository')
    private productRepository: IProductsProvider,
  ) {}

  public async execute({
    address_id,
    purchaseAmount,
    products,
    cardHash,
    customer_id,
  }: ICheckoutDTO): Promise<void> {
    const userData = await this.userRepository.findById(customer_id);

    switch (userData) {
      case null:
        throw new AppError(
          'Usuário não identificado para realizar a compra',
          404,
        );
      case undefined:
        throw new AppError('Usuário inválido para realizar a compra', 400);
      default:
    }

    const addressData = await this.addressRepository.findAddressById(
      address_id,
    );

    switch (addressData) {
      case null:
        throw new AppError(
          'Endereço não identificado para realizar a compra',
          404,
        );
      case undefined:
        throw new AppError('Endereço inválido para realizar a compra', 400);
      default:
    }

    if (purchaseAmount === undefined)
      throw new AppError('Valor da compra inválido');

    if (purchaseAmount <= 0)
      throw new AppError('Valor da compra inválido', 403);

    if (purchaseAmount)
      await this.pagarmeProvider.createTransaction({
        amount: purchaseAmount * 100,
        cardHash,
        products,
        userData,
        addressData,
      });
  }
}

export default CreateCheckoutService;
