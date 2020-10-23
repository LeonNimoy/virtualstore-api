import { UserSchema } from '../infra/databases/mongoose/schemas/UserSchema';
import IUserEntity from '../entities/IUserEntity';
import IUserDTO from '../dtos/IUserDTO';
import IUsersProvider from '../providers/IUsersProvider';

export default class UsersRepository implements IUsersProvider {
  public async find(): Promise<IUserEntity[]> {
    const users = await UserSchema.find().select('-password');

    return users;
  }

  public async findById(id: string): Promise<IUserEntity | undefined | null> {
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
  ): Promise<IUserEntity | undefined | null> {
    const findUser = await UserSchema.findOne({
      email: userEmail,
    });

    return findUser;
  }

  public async save(userData: IUserDTO): Promise<IUserEntity> {
    const userCreated = new UserSchema(userData);
    await userCreated.save();
    return userCreated.id;
  }

  public async update(userData: IUserDTO): Promise<IUserEntity | null> {
    const userUpdated = await UserSchema.findByIdAndUpdate(
      userData.id,
      userData,
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
