/* eslint-disable no-plusplus */
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

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

    @inject('TransactionsRepository')
    private transactionRepository: ITransactionProvider,

    @inject('CartsRepository')
    private cartRepository: ICartProvider,

    @inject('ProductsRepository')
    private productRepository: IProductsProvider,
  ) {}

  public async execute({
    payment_method,
    amount,
    payment_token,
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

    if (amount === undefined) throw new AppError('Valor da compra inválido');

    if (amount <= 0) throw new AppError('Valor da compra inválido', 403);

    const checkoutCreated = await this.pagarmeProvider.createTransaction({
      amount,
      payment_method,
      payment_token,
    });

    if (!checkoutCreated)
      throw new AppError(
        'Não foi possível concluir a sua compra. Divergência nos dados enviados.',
      );

    const transactionCreated = await this.transactionRepository.saveTransaction(
      checkoutCreated,
    );

    if (transactionCreated) {
      const userCart = await this.cartRepository.findCartByUserId(customer_id);

      switch (userCart) {
        case null:
          throw new AppError('Produtos inválidos para o registro no estoque');
        default:
          userCart!.products!.map(product =>
            this.productRepository.decreaseProductQuantity(
              product.id!,
              product.quantity!,
            ),
          );
      }
      await this.cartRepository.emptyUserCart(customer_id);
    }

    if (!transactionCreated) throw new AppError('Compra não registrada');
  }
}

export default CreateCheckoutService;
