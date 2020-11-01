import IAddressDTO from '../dtos/IAddressDTO';
import Address from '../infra/databases/entities/Address';

export default interface IAddressesProvider {
  findAllAddresses(user_id: string): Promise<Address[] | null>;
  findAddressById(
    address_id: string | undefined,
  ): Promise<Address | undefined | null>;
  saveAddress(addressData: IAddressDTO): Promise<void>;
  updateUserAddress(newAddressData: IAddressDTO): Promise<Address | null>;
  deleteUserAddress(addressData: IAddressDTO): Promise<void>;
}
