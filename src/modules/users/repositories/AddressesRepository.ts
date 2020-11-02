import { format } from 'date-fns';

import IAddressDTO from '../dtos/IAddressDTO';
import IAddressesProvider from '../providers/IAddressesProvider';
import { AddressSchema } from '../infra/databases/mongoose/schemas/AddressSchema';
import Address from '../infra/databases/entities/Address';

export default class AddressesRepository implements IAddressesProvider {
  public async findAllAddresses(user_id: string): Promise<Address[] | null> {
    const userAddresses = await AddressSchema.find({ user_id });

    return userAddresses;
  }

  public async findAddressById(
    id: string,
  ): Promise<Address | undefined | null> {
    const userId = await AddressSchema.findById(id);

    return userId;
  }

  public async saveAddress({
    cep,
    address,
    address_complement,
    neighborhood,
    city,
    state,
    id,
  }: IAddressDTO): Promise<void> {
    const createUserAddress = new AddressSchema({
      cep,
      address,
      address_complement,
      neighborhood,
      city,
      state,
      user_id: id,
    });

    await createUserAddress.save();
  }

  public async updateUserAddress(addressNewData: IAddressDTO): Promise<void> {
    await AddressSchema.findByIdAndUpdate(addressNewData.address_id, {
      $set: addressNewData,
      updated_at: format(Date.now(), "dd/MM/yyyy '-' HH'h'mm'm'ss's'"),
    });
  }

  public async deleteUserAddress(addressData: IAddressDTO): Promise<void> {
    await AddressSchema.deleteOne(addressData);
  }
}
