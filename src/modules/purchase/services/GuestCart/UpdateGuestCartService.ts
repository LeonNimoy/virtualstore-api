import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import ICartDTO from '@modules/purchase/dtos/ICartDTO';
import AppError from '@shared/errors/AppError';
import GuestCart from '@modules/purchase/infra/databases/entities/GuestCart';
import IGuestCartProvider from '@modules/purchase/providers/IGuestCartProvider';

@injectable()
class UpdateGuestCartService {
  constructor(
    @inject('GuestCartsRepository')
    private guestCartRepository: IGuestCartProvider,
  ) {}

  public async execute(guestCartNewData: ICartDTO): Promise<GuestCart> {
    const guestCartUpdated = await this.guestCartRepository.updateGuestGuestCartProducts(
      guestCartNewData,
    );

    switch (guestCartUpdated) {
      case null:
        throw new AppError('Não foi possível atualizar o carrinho', 404);
      default:
        return guestCartUpdated;
    }
  }
}

export default UpdateGuestCartService;
