import { UserSchema } from '../databases/mongoose/schemas/UserSchema';
import IUserEntity from '../entities/IUserEntity';
import IUserDTO from '../dtos/IUserDTO';
import IUsersProvider from '../providers/IUsersProvider';

export default class usersRepository implements IUsersProvider {
  public async find(id: string): Promise<IUserEntity> {
    const userId = await UserSchema.findById(id);

    if (userId === null) {
      throw new Error('user not found');
    }

    return userId;
  }

  public async save(userData: IUserDTO): Promise<IUserEntity> {
    const userCreated = new UserSchema(userData);
    await userCreated.save();
    return userCreated;
  }

  // public async update(userData: userDTO): Promise<IUserEntity> {
  //   const userUpdated = await UserSchema.findByIdAndUpdate(
  //     userData.id,
  //     userData,
  //     { new: true },
  //   );

  //   if (userUpdated === null) {
  //     throw new Error('user not found');
  //   }

  //   return userUpdated;
  // }

  // public async delete(user: userDTO): Promise<void> {
  //   const userDeleted = await UserSchema.findByIdAndDelete(user.id);

  //   if (userDeleted === null) {
  //     throw new Error('user not found');
  //   }
  // }
}
