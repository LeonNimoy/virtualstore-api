import IUserDTO from '../dtos/IUserDTO';
import IUserEntity from '../entities/IUserEntity';

export default interface IUserProvider {
  find(id: string | undefined): Promise<IUserEntity>;
  findEmail(userEmail: string): Promise<boolean>;
  save(userData: IUserDTO): Promise<IUserEntity>;
  update(newUserData: IUserDTO): Promise<IUserEntity>;
  delete(user: IUserDTO): Promise<void>;
}
