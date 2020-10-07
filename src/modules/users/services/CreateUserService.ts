import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IUserDTO from '../dtos/IUserDTO';
import IUserEntity from '../entities/IUserEntity';
import IUsersProvider from '../providers/IUsersProvider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    phone,
    cpf,
    address,
  }: IUserDTO): Promise<IUserEntity> {
    const user = this.userRepository.save({
      name,
      email,
      password,
      phone,
      cpf,
      address,
    });
    await user;
    return user;
  }
}

export default CreateUserService;
