import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICartDTO from '../../dtos/ICartDTO';
import ICartProvider from '../../providers/ICartProvider';

@injectable()
class CreateCartService {
  constructor(
    @inject('CartsRepository')
    private cartRepository: ICartProvider,
  ) {}

  public async execute({ user_id }: ICartDTO): Promise<void> {
    if (!user_id) throw new AppError('Usuário não identificado');

    await this.cartRepository.createACart(user_id);
  }
}

export default CreateCartService;
