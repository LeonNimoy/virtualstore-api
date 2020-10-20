import { injectable, inject } from 'tsyringe';

import IUsersProvider from '../providers/IUsersProvider';
import AppError from '../../../shared/errors/AppError';

interface Request {
  id: string | undefined;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersProvider,
  ) {}

  public async execute({ id }: Request): Promise<void> {
    const user = await this.userRepository.findById(id);

    switch (user) {
      case null:
        throw new AppError('User not found', 404);
      case undefined:
        throw new AppError('User not found', 400);
      default:
    }

    await this.userRepository.delete(user);
  }
}

export default DeleteUserService;
