/* eslint-disable no-plusplus */
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IAddressesProvider from '@modules/users/providers/IAddressesProvider';
import IUsersProvider from '@modules/users/providers/IUsersProvider';
import AppError from '@shared/errors/AppError';
import ITransactionProvider from '@modules/purchase/providers/ITransactionProvider';
import ICartProvider from '@modules/purchase/providers/ICartProvider';
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

    @inject('TransactionsRepository')
    private transactionRepository: ITransactionProvider,

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
    if (!customer_id) throw new AppError('Usuário não identificado');

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

    if (products === undefined)
      throw new AppError('Produtos do carrinho inválidos');

    const productsWithValidFormat = products.map(
      ({ id, quantity, tangible, title, unit_price }) =>
        true && {
          id,
          quantity,
          tangible,
          title,
          unit_price: Math.round(unit_price * 100),
        },
    );

    const checkoutCreated = await this.pagarmeProvider.createTransaction({
      amount: purchaseAmount * 100,
      cardHash,
      productsWithValidFormat,
      userData,
      addressData,
    });

    const transactionCreated = await this.transactionRepository.saveTransaction(
      checkoutCreated,
    );

    if (transactionCreated) {
      const userCart = await this.cartRepository.findCartByUserId(customer_id);

      switch (userCart) {
        case undefined:
          throw new AppError('Produtos inválidos para contabilização');
        case null:
          throw new AppError('Produtos inválidos para o registro no estoque');
        default:
          userCart.products!.map(product =>
            this.productRepository.decreaseProductQuantity(
              product.id,
              product.quantity,
            ),
          );
      }
      await this.cartRepository.emptyUserCart(customer_id);
    }

    if (!transactionCreated) throw new AppError('Compra não registrada');
  }
}

export default CreateCheckoutService;
