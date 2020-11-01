import IUserDTO from '../dtos/IUserDTO';
import User from '../infra/databases/entities/User';

export default interface IUserProvider {
  find(): Promise<User[]>;
  findById(id: string | undefined): Promise<User | undefined | null>;
  checkEmail(userEmail: string): Promise<boolean>;
  findByEmail(userEmail: string): Promise<User | undefined | null>;
  save(userData: IUserDTO): Promise<User>;
  update(newUserData: IUserDTO): Promise<User | null>;
  delete(user: IUserDTO): Promise<void | null>;
}
