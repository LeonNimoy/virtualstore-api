import IProfileDTO from '../dtos/IProfileDTO';
import User from '../infra/databases/mongoose/entities/User';

export default interface IProfileProvider {
  findById(userId: string | undefined): Promise<User | undefined | null>;
  save({
    address,
    address_2,
    cep,
    city,
    neighborhood,
    state,
    cpf,
    phone,
  }: IProfileDTO): Promise<void>;
  update(newProfileData: IProfileDTO): Promise<User | null>;
  delete(profileData: IProfileDTO): Promise<void>;
}
