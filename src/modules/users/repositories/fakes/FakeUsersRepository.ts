import IUserDTO from '../../dtos/IUserDTO';
import { UserSchema } from '../../infra/databases/mongoose/schemas/UserSchema';
import User from '../../infra/databases/entities/User';
import IUsersProvider from '../../providers/IUsersProvider';

class FakeUsersRepository implements IUsersProvider {
  private users: User[] = [];

  public async find(): Promise<User[]> {
    const users = await UserSchema.find();

    return users;
  }

  public async findById(
    id: string | undefined,
  ): Promise<User | null | undefined> {
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
  ): Promise<User | undefined | null> {
    const findUser = this.users.find(user => user.email === userEmail);

    return findUser;
  }

  public async save(userData: IUserDTO): Promise<User> {
    const user = new UserSchema(userData);

    Object.assign(user, userData);

    this.users.push(user);
    return user;
  }

  public async update(newUserData: IUserDTO): Promise<User | null> {
    if (this.users.find(element => element.id === newUserData.id)) {
      this.users.map(user => newUserData === user);
    }
    return Object.assign(newUserData);
  }

  public async delete(userToDelete: IUserDTO): Promise<void> {
    const findUser = this.users.map(user => userToDelete.id === user.id);

    if (findUser) {
      this.users.splice(0, 1);
    }
  }
}

export default FakeUsersRepository;
