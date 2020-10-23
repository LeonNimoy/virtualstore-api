import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IUserDTO from '../../dtos/IUserDTO';
import IUserEntity from '../../entities/IUserEntity';
import IUsersProvider from '../../providers/IUsersProvider';
import IHashUser from '../../providers/HashUser/models/IHashUser';
import AppError from '../../../../shared/errors/AppError';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersProvider,

    @inject('HashUser')
    private hashUser: IHashUser,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IUserDTO): Promise<IUserEntity> {
    const checkEmail = await this.userRepository.checkEmail(email);

    if (checkEmail) {
      const hashedPassword = await this.hashUser.generateHash(password);

      const user = await this.userRepository.save({
        name,
        email,
        password: hashedPassword,
      });

      return user;
    }

    throw new AppError('Email already used!', 409);
  }
}

export default CreateUserService;
