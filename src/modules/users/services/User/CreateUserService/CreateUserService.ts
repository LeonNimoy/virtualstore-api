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

  public async execute({
    name,
    email,
    password,
    phone,
    cpf,
  }: IUserDTO): Promise<User> {
    const userDataValidator = new UserDataValidatorProvider();

    const checkEmailFormat = await userDataValidator.validateEmail(email);

    if (!checkEmailFormat) throw new AppError('Email inválido');

    const checkPasswordFormat = await userDataValidator.validatePassword(
      password,
    );

    if (!checkPasswordFormat)
      throw new AppError('A senha deve ter no mínimo 6 caracteres');

    const checkCpfFormat = await userDataValidator.validateCpf(cpf);

    if (!checkCpfFormat) throw new AppError('CPF inválido');

    const checkPhoneFormat = await userDataValidator.validatePhone(phone);

    if (!checkPhoneFormat) throw new AppError('Telefone inválido');

    const checkEmailExistence = await this.userRepository.checkEmail(email);

    if (checkEmailExistence) {
      const hashedPassword = await this.hashUser.generateHash(password);

      const user = await this.userRepository.save({
        name,
        email,
        phone,
        cpf,
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
