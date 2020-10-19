import IUserDTO from '../dtos/IUserDTO';
import IUserEntity from '../entities/IUserEntity';

export default interface IUserProvider {
  find(): Promise<IUserEntity[]>;
  findById(id: string | undefined): Promise<IUserEntity | undefined | null>;
  checkEmail(userEmail: string): Promise<boolean>;
  findByEmail(userEmail: string): Promise<IUserEntity | undefined | null>;
  save(userData: IUserDTO): Promise<IUserEntity>;
  update(newUserData: IUserDTO): Promise<IUserEntity | null>;
  delete(user: IUserDTO): Promise<void | null>;
}
