import IAddressDTO from '../dtos/IAddressDTO';
import Address from '../infra/databases/entities/Address';

export default interface IAddressesProvider {
  findAllAddresses(
    user_id: string,
  ): Promise<Address[] | Address | null | undefined>;
  findAddressById(
    address_id: string | undefined,
  ): Promise<Address | undefined | null>;
  saveAddress(addressData: IAddressDTO): Promise<Address>;
  updateUserAddress(newAddressData: IAddressDTO): Promise<void>;
  deleteUserAddress(addressId: string | undefined): Promise<void>;
  deleteAllUserAddresses(userId: string | undefined): Promise<void>;
}
