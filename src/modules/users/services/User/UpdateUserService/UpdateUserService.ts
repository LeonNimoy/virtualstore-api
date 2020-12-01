import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IUserDTO from '../../../dtos/IUserDTO';
import User from '../../../infra/databases/entities/User';
import IUsersProvider from '../../../providers/IUsersProvider';
import IHashUser from '../../../providers/HashUser/models/IHashUser';
import AppError from '../../../../../shared/errors/AppError';
import UserDataValidatorProvider from '../../../providers/Validations/UserDataValidatorProvider';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersProvider,

    @inject('HashUser')
    private hashUser: IHashUser,
  ) {}

  public async execute(userNewData: IUserDTO): Promise<User> {
    const user = await this.userRepository.findById(userNewData.id);

    switch (user) {
      case null:
        throw new AppError('Cadastro não encontrado', 404);
      case undefined:
        throw new AppError('Cadastro não encontrado', 400);
      default:
    }

    const userDataValidator = new UserDataValidatorProvider();

    if (userNewData.name) {
      user.name = userNewData.name;
    }

    if (userNewData.email) {
      const checkEmailFormat = await userDataValidator.validateEmail(
        userNewData.email,
      );

      if (!checkEmailFormat) throw new AppError('Email inválido');

      user.email = userNewData.email;
    }

    if (userNewData.password) {
      const checkPasswordFormat = await userDataValidator.validatePassword(
        userNewData.password,
      );

      if (!checkPasswordFormat)
        throw new AppError('A senha deve ter no mínimo 6 caracteres');

      const hashedPassword = await this.hashUser.generateHash(
        userNewData.password,
      );
      user.password = hashedPassword;
    }

    if (userNewData.phone) {
      const checkPhoneFormat = await userDataValidator.validatePhone(
        userNewData.phone,
      );

      if (!checkPhoneFormat) throw new AppError('Telefone inválido');

      user.phone = userNewData.phone;
    }

    if (userNewData.cpf) {
      const checkCpfFormat = await userDataValidator.validateCpf(
        userNewData.cpf,
      );

      if (!checkCpfFormat) throw new AppError('CPF inválido');

      user.cpf = userNewData.cpf;
    }

    const userUpdated = await this.userRepository.update(user);

    switch (userUpdated) {
      case null:
        throw new AppError('Cadastro não atualizado', 404);
      default:
    }

    return userUpdated;
  }
}

export default UpdateUserService;
