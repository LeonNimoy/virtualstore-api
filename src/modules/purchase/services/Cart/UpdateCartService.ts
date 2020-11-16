import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import ICartDTO from '@modules/purchase/dtos/ICartDTO';
import AppError from '@shared/errors/AppError';
import Cart from '@modules/purchase/infra/databases/entities/Cart';
import ICartProvider from '@modules/purchase/providers/ICartProvider';

@injectable()
class UpdateCartService {
  constructor(
    @inject('CartsRepository')
    private cartRepository: ICartProvider,
  ) {}

  public async execute(cartNewData: ICartDTO): Promise<Cart> {
    const findCart = await this.cartRepository.updateCartProducts(cartNewData);

    switch (findCart) {
      case null:
        throw new AppError('Carrinho não encontrado', 404);
      default:
        return findCart;
    }
  }
}

export default UpdateCartService;
