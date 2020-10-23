import IProfileDTO from '../dtos/IProfileDTO';
import IAddressEntity from '../entities/IAddressEntity';

export default interface IProfileProvider {
  findById(
    userId: string | undefined,
  ): Promise<IAddressEntity | undefined | null>;
  save({
    address,
    address_2,
    cep,
    city,
    neighborhood,
    state,
    cpf,
    phone,
    user_id,
  }: IProfileDTO): Promise<void | undefined>;
  update(newProfileData: IProfileDTO): Promise<IAddressEntity | null>;
  delete(profileData: IProfileDTO): Promise<void | null>;
}
