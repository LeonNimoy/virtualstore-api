import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IUserDTO from '../dtos/IUserDTO';
import IUserEntity from '../entities/IUserEntity';
import IUsersProvider from '../providers/IUsersProvider';
import IHashUser from '../providers/HashUser/models/IHashUser';
import AppError from '../../../shared/errors/AppError';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersProvider,

    @inject('HashUser')
    private hashUser: IHashUser,
  ) {}

  public async execute(userNewData: IUserDTO): Promise<IUserEntity> {
    const user = await this.userRepository.findById(userNewData.id);

    switch (user) {
      case null:
        throw new AppError('User not found', 404);
      case undefined:
        throw new AppError('User not found', 400);
      default:
    }

    if (userNewData.name) {
      user.name = userNewData.name;
    }

    if (userNewData.email) {
      user.email = userNewData.email;
    }

    if (userNewData.password) {
      const hashedPassword = await this.hashUser.generateHash(
        userNewData.password,
      );
      user.password = hashedPassword;
    }

    if (userNewData.phone) {
      user.phone = userNewData.phone;
    }

    if (userNewData.cpf) {
      user.cpf = userNewData.cpf;
    }

    if (userNewData.address) {
      user.address = userNewData.address;
    }

    const userUpdated = await this.userRepository.update(user);

    switch (userUpdated) {
      case null:
        throw new AppError('User not found', 404);
      default:
    }

    return userUpdated;
  }
}

export default UpdateUserService;
