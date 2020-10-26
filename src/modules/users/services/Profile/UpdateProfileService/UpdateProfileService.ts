import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IProfileProvider from '../../../providers/IProfileProvider';
import AppError from '../../../../../shared/errors/AppError';
import IProfileDTO from '../../../dtos/IProfileDTO';
import IUsersProvider from '../../../providers/IUsersProvider';

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersProvider,

    @inject('ProfileRepository')
    private profileRepository: IProfileProvider,
  ) {}

  public async execute({
    id,
    cpf,
    phone,
    cep,
    address,
    address_2,
    neighborhood,
    city,
    state,
  }: IProfileDTO): Promise<void> {
    const findValidUser = await this.userRepository.findById(id);

    switch (findValidUser) {
      case null:
        throw new AppError('User not found', 404);
      case undefined:
        throw new AppError('Invalid Registration', 400);
      default:
    }

    await this.profileRepository.save({
      id,
      cpf,
      phone,
      cep,
      address,
      address_2,
      neighborhood,
      city,
      state,
    });
  }
}

export default UpdateProfileService;
