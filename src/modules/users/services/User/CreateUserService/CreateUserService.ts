import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IUserDTO from '../../../dtos/IUserDTO';
import User from '../../../infra/databases/entities/User';
import IUsersProvider from '../../../providers/IUsersProvider';
import IHashUser from '../../../providers/HashUser/models/IHashUser';
import AppError from '../../../../../shared/errors/AppError';
import UserDataValidatorProvider from '../../../providers/Validations/UserDataValidatorProvider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersProvider,

    @inject('HashUser')
    private hashUser: IHashUser,
  ) {}

  public async execute({ name, email, password }: IUserDTO): Promise<User> {
    const userDataValidator = new UserDataValidatorProvider();

    const checkEmailFormat = await userDataValidator.validateEmail(email);

    if (!checkEmailFormat) throw new AppError('Email inválido');

    const checkPasswordFormat = await userDataValidator.validatePassword(
      password,
    );

    if (!checkPasswordFormat)
      throw new AppError('A senha deve ter no mínimo 6 caracteres');

    const checkEmailExistence = await this.userRepository.checkEmail(email);

    if (checkEmailExistence) {
      const hashedPassword = await this.hashUser.generateHash(password);

      const user = await this.userRepository.save({
        name,
        email,
        password: hashedPassword,
      });

      return user;
    }

    throw new AppError(
      'Já existe uma conta com este email. Por favor, informar outro email',
      409,
    );
  }
}

export default CreateUserService;
