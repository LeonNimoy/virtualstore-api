import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import { UserSchema } from '../infra/databases/mongoose/schemas/UserSchema';
import User from '../infra/databases/entities/User';
import IUserDTO from '../dtos/IUserDTO';
import IUsersProvider from '../providers/IUsersProvider';

export default class UsersRepository implements IUsersProvider {
  public async find(): Promise<User[]> {
    const users = await UserSchema.find().select('-password');

    return users;
  }

  public async findById(id: string): Promise<User | null | undefined> {
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

  public async save({
    email,
    name,
    password,
    phone,
    cpf,
  }: IUserDTO): Promise<User> {
    const newDate = new Date();
    const timeZone = 'America/Sao_Paulo';
    const dateWithTimeZone = utcToZonedTime(newDate, timeZone);
    const userCreated = new UserSchema({
      email,
      name,
      password,
      phone,
      cpf,
      created_at: format(dateWithTimeZone, "dd/MM/yyyy '-' HH'h'mm'm'ss's'"),
    });
    await userCreated.save();
    return userCreated.id;
  }

  public async update(newUserData: IUserDTO): Promise<User | null> {
    const newDate = new Date();
    const timeZone = 'America/Sao_Paulo';
    const dateWithTimeZone = utcToZonedTime(newDate, timeZone);
    const userUpdated = await UserSchema.findByIdAndUpdate(
      newUserData.id,
      {
        $set: newUserData,
        updated_at: format(dateWithTimeZone, "dd/MM/yyyy '-' HH'h'mm'm'ss's'"),
      },
      {
        new: true,
      },
    ).select('-password');

    return userUpdated;
  }

  public async delete(user: IUserDTO): Promise<void> {
    await UserSchema.deleteOne(user);
  }
}
