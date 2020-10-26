import { UserSchema } from '../infra/databases/mongoose/schemas/UserSchema';
import User from '../infra/databases/entities/User';
import IProfileDTO from '../dtos/IProfileDTO';
import IProfileProvider from '../providers/IProfileProvider';

export default class ProfilesRepository implements IProfileProvider {
  public async findById(
    userId: string | undefined,
  ): Promise<User | undefined | null> {
    const findUserId = await UserSchema.findById(userId);

    return findUserId;
  }

  public async save({
    cep,
    address,
    address_2,
    neighborhood,
    city,
    state,
    cpf,
    phone,
    id,
  }: IProfileDTO): Promise<void> {
    await UserSchema.findByIdAndUpdate(id, {
      cpf,
      phone,
      addresses: [{ cep, address, address_2, neighborhood, city, state }],
    });
  }

  public async update(newProfileData: IProfileDTO): Promise<User | null> {
    const profileUpdated = await UserSchema.findByIdAndUpdate(
      newProfileData.id,
      newProfileData,
      {
        new: true,
      },
    );

    return profileUpdated;
  }

  public async delete(profileData: IProfileDTO): Promise<void> {
    await UserSchema.deleteOne(profileData);
  }
}
