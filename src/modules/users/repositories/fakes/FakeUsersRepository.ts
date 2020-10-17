import IUserDTO from '../../dtos/IUserDTO';
import { UserSchema } from '../../databases/mongoose/schemas/UserSchema';
import IUserEntity from '../../entities/IUserEntity';
import IUsersProvider from '../../providers/IUsersProvider';
import AppError from '../../../../shared/errors/AppError';

class FakeUsersRepository implements IUsersProvider {
  private users: IUserEntity[] = [];

  public async find(): Promise<IUserEntity[]> {
    const users = await UserSchema.find();

    if (users === null) {
      throw new AppError('users not found!', 404);
    }
    return users;
  }

  public async findById(id: string | undefined): Promise<IUserEntity> {
    const userId = this.users.find(user => user.id === id);

    if (userId === undefined) {
      throw new AppError('User not found', 404);
    }

    return userId;
  }

  public async checkEmail(newUserEmail: string): Promise<boolean> {
    const notAvailableEmail = this.users.find(
      user => user.email === newUserEmail,
    );

    if (!notAvailableEmail) {
      return true;
    }

    return false;
  }

  public async findByEmail(userEmail: string): Promise<IUserEntity> {
    const findUser = this.users.find(user => user.email === userEmail);

    if (!findUser) {
      throw new AppError('Invalid Email or Password!', 401);
    }

    return findUser;
  }

  public async save(userData: IUserDTO): Promise<IUserEntity> {
    const user = new UserSchema(userData);

    Object.assign(user, userData);

    this.users.push(user);
    return user;
  }

  public async update(newUserData: IUserDTO): Promise<IUserEntity> {
    this.users.map(user => newUserData === user);

    return newUserData;
  }

  public async delete(userToDelete: IUserDTO): Promise<void> {
    const findUser = this.users.map(user => userToDelete.id === user.id);

    if (findUser) {
      this.users.splice(0, 1);
    }
  }
}

export default FakeUsersRepository;
