import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICartProvider from '@modules/purchase/providers/ICartProvider';

@injectable()
class DeleteCartService {
  constructor(
    @inject('CartsRepository')
    private cartRepository: ICartProvider,
  ) {}

  public async execute(user_id: string): Promise<void> {
    const deleteCart = await this.cartRepository.deleteCart(user_id);

    switch (deleteCart) {
      case null:
        throw new AppError('Carrinho não encontrado', 404);
      default:
    }
  }
}

export default DeleteCartService;
