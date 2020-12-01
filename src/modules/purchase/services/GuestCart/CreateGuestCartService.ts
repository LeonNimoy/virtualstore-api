import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import GuestCart from '@modules/purchase/infra/databases/entities/GuestCart';
import ICartDTO from '../../dtos/ICartDTO';
import IGuestCartProvider from '../../providers/IGuestCartProvider';

@injectable()
class CreateGuestCartService {
  constructor(
    @inject('GuestCartsRepository')
    private guestCartRepository: IGuestCartProvider,
  ) {}

  public async execute(guestToken: ICartDTO): Promise<GuestCart> {
    const guestCartCreated = await this.guestCartRepository.createAGuestGuestCart(
      guestToken,
    );

    return guestCartCreated;
  }
}

export default CreateGuestCartService;
