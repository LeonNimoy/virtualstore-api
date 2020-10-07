import IUserDTO from '../dtos/IUserDTO';
import IUserEntity from '../entities/IUserEntity';

export default interface IUserProvider {
  find(id: string | undefined): Promise<IUserEntity>;
  save(userData: IUserDTO): Promise<IUserEntity>;
  // update(newUserData: IUserDTO): Promise<IUserEntity>;
  // delete(User: IUserDTO): Promise<void>;
}
