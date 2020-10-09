import { injectable, inject } from 'tsyringe';

import IUsersProvider from '../providers/IUsersProvider';

interface Request {
  id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersProvider,
  ) {}

  public async execute({ id }: Request): Promise<void> {
    const user = await this.userRepository.find(id);

    if (!user) {
      throw new Error('user not Found');
    }

    await this.userRepository.delete(user);
  }
}

export default DeleteUserService;
