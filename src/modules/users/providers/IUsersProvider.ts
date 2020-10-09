import IUserDTO from '../dtos/IUserDTO';
import IUserEntity from '../entities/IUserEntity';

export default interface IUserProvider {
  find(id: string | undefined): Promise<IUserEntity>;
  checkEmail(userEmail: string): Promise<boolean>;
  findByEmail(userEmail: string): Promise<IUserEntity>;
  save(userData: IUserDTO): Promise<IUserEntity>;
  update(newUserData: IUserDTO): Promise<IUserEntity>;
  delete(user: IUserDTO): Promise<void>;
}
