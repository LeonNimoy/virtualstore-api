import { UserSchema } from '../databases/mongoose/schemas/UserSchema';
import IUserEntity from '../entities/IUserEntity';
import IUserDTO from '../dtos/IUserDTO';
import IUsersProvider from '../providers/IUsersProvider';
import AppError from '../../../shared/errors/AppError';

export default class UsersRepository implements IUsersProvider {
  public async find(): Promise<IUserEntity[]> {
    const userId = await UserSchema.find();

    if (userId === null) {
      throw new AppError('Users not found!', 404);
    }
    return userId;
  }

  public async findById(id: string): Promise<IUserEntity> {
    const userId = await UserSchema.findById(id);

    if (userId === null) {
      throw new AppError('User not found!', 404);
    }

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

  public async findByEmail(userEmail: string): Promise<IUserEntity> {
    const findUser = await UserSchema.findOne({
      email: userEmail,
    });

    if (!findUser) {
      throw new AppError('Invalid Email or Password!', 401);
    }

    return findUser;
  }

  public async save(userData: IUserDTO): Promise<IUserEntity> {
    const userCreated = new UserSchema(userData);
    await userCreated.save();
    return userCreated;
  }

  public async update(userData: IUserDTO): Promise<IUserEntity> {
    const userUpdated = await UserSchema.findByIdAndUpdate(
      userData.id,
      userData,
      {
        new: true,
      },
    );

    if (userUpdated === null) {
      throw new AppError('Not able to update user!', 401);
    }

    return userUpdated;
  }

  public async delete(user: IUserDTO): Promise<void> {
    const userDeleted = await UserSchema.deleteOne(user);

    if (userDeleted === null) {
      throw new AppError('User not found!', 404);
    }
  }
}
