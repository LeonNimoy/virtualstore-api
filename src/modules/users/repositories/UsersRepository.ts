import { format } from 'date-fns';

import { UserSchema } from '../infra/databases/mongoose/schemas/UserSchema';
import User from '../infra/databases/entities/User';
import IUserDTO from '../dtos/IUserDTO';
import IUsersProvider from '../providers/IUsersProvider';

export default class UsersRepository implements IUsersProvider {
  public async find(): Promise<User[]> {
    const users = await UserSchema.find().select('-password');

    return users;
  }

  public async findById(id: string): Promise<User | undefined | null> {
    const userId = await UserSchema.findById(id).select('-password');

    return userId;
  }

  public async checkEmail(newUserEmail: string): Promise<boolean> {
    const notAvailableEmail = await UserSchema.findOne({
      email: newUserEmail,
    });

    if (!notAvailableEmail) {
      return true;
    }

    return false;
  }

  public async findByEmail(
    userEmail: string,
  ): Promise<User | undefined | null> {
    const findUser = await UserSchema.findOne({
      email: userEmail,
    });

    return findUser;
  }

  public async save(userData: IUserDTO): Promise<User> {
    const userCreated = new UserSchema(userData);
    await userCreated.save();
    return userCreated.id;
  }

  public async update({
    email,
    name,
    password,
    cpf,
    id,
    phone,
  }: IUserDTO): Promise<User | null> {
    const userUpdated = await UserSchema.findByIdAndUpdate(
      id,
      {
        phone,
        email,
        name,
        password,
        cpf,
        updated_at: format(new Date(), "dd/MM/yyyy '-' HH'h'mm'm'ss's'"),
      },
      {
        new: true,
      },
    ).select('-password');

    return userUpdated;
  }

  public async delete(user: IUserDTO): Promise<void | null> {
    await UserSchema.deleteOne(user);
  }
}
