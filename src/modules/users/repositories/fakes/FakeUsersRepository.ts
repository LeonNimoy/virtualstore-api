import IUserDTO from '../../dtos/IUserDTO';
import { UserSchema } from '../../databases/mongoose/schemas/UserSchema';
import IUserEntity from '../../entities/IUserEntity';
import IUsersProvider from '../../providers/IUsersProvider';

class FakeUsersRepository implements IUsersProvider {
  private users: IUserEntity[] = [];

  public async find(): Promise<IUserEntity[]> {
    const users = await UserSchema.find();

    return users;
  }

  public async findById(
    id: string | undefined,
  ): Promise<IUserEntity | undefined> {
    const userId = this.users.find(user => user.id === id);

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

  public async findByEmail(
    userEmail: string,
  ): Promise<IUserEntity | undefined | null> {
    const findUser = this.users.find(user => user.email === userEmail);

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

  public async delete(userToDelete: IUserDTO): Promise<void | null> {
    const findUser = this.users.map(user => userToDelete.id === user.id);

    if (findUser) {
      this.users.splice(0, 1);
    }
  }
}

export default FakeUsersRepository;
