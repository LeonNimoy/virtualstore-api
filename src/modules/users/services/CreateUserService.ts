import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

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
    const checkNewUserEmail = await this.userRepository.findEmail(email);
    if (!checkNewUserEmail) {
      throw new Error('Email already used!');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.save({
      name,
      email,
      password: hashedPassword,
      phone,
      cpf,
      address,
    });

    return user;
  }
}

export default CreateUserService;
