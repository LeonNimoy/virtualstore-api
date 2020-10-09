import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IUserDTO from '../dtos/IUserDTO';
import IUserEntity from '../entities/IUserEntity';
import IUsersProvider from '../providers/IUsersProvider';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersProvider,
  ) {}

  public async execute(userNewData: IUserDTO): Promise<IUserEntity> {
    const user = await this.userRepository.find(userNewData.id);

    if (!user) {
      throw new Error('user not Found');
    }

    if (userNewData.name) {
      user.name = userNewData.name;
    }

    if (userNewData.email) {
      user.email = userNewData.email;
    }

    if (userNewData.password) {
      user.password = userNewData.password;
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

    return userUpdated;
  }
}

export default UpdateUserService;
