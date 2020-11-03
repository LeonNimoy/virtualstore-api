import { injectable, inject } from 'tsyringe';

import IUsersProvider from '../../../providers/IUsersProvider';
import AppError from '../../../../../shared/errors/AppError';
import IAddressesProvider from '../../../providers/IAddressesProvider';

interface Request {
  id: string | undefined;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersProvider,

    @inject('AddressesRepository')
    private addressRepository: IAddressesProvider,
  ) {}

  public async execute({ id }: Request): Promise<void> {
    const user = await this.userRepository.findById(id);

    switch (user) {
      case null:
        throw new AppError('Usuário não encontrado!', 404);
      case undefined:
        throw new AppError('Usuário não identificado!', 404);
      default:
    }

    await this.addressRepository.deleteAllUserAddresses(user.id);
    await this.userRepository.delete(user);
  }
}

export default DeleteUserService;
