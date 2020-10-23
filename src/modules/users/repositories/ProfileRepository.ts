import { AddressSchema } from '../infra/databases/mongoose/schemas/AddressSchema';
import { UserSchema } from '../infra/databases/mongoose/schemas/UserSchema';
import IAddressEntity from '../entities/IAddressEntity';
import IProfileDTO from '../dtos/IProfileDTO';
import IProfileProvider from '../providers/IProfileProvider';

export default class ProfilesRepository implements IProfileProvider {
  public async findById(
    userId: string | undefined,
  ): Promise<IAddressEntity | undefined | null> {
    const findUserId = await AddressSchema.findById(userId);

    return findUserId;
  }

  public async save({
    address,
    address_2,
    cep,
    city,
    neighborhood,
    state,
    cpf,
    phone,
    user_id,
  }: IProfileDTO): Promise<void> {
    const addressSaved = new AddressSchema({
      user_id,
      address,
      address_2,
      cep,
      city,
      neighborhood,
      state,
    });
    await addressSaved.save();
    await UserSchema.findByIdAndUpdate(
      user_id,
      { cpf, phone, addresses_id: addressSaved.id },
      {
        new: true,
      },
    );
  }

  public async update(
    newProfileData: IProfileDTO,
  ): Promise<IAddressEntity | null> {
    const profileUpdated = await AddressSchema.findByIdAndUpdate(
      newProfileData.user_id,
      newProfileData,
      {
        new: true,
      },
    );

    return profileUpdated;
  }

  public async delete(profileData: IProfileDTO): Promise<void | null> {
    await AddressSchema.deleteOne(profileData);
  }
}
