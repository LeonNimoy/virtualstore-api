import IAddressDTO from '../../dtos/IAddressDTO';
import { AddressSchema } from '../../infra/databases/mongoose/schemas/AddressSchema';
import Address from '../../infra/databases/entities/Address';
import IAddressesProvider from '../../providers/IAddressesProvider';

class FakeAddressesRepository implements IAddressesProvider {
  private addresses: Address[] = [];

  public async findAllAddresses(
    user_id: string,
  ): Promise<Address[] | Address | undefined> {
    const userId = this.addresses.find(address => address.id === user_id);

    return userId;
  }

  public async findAddressById(
    address_id: string | undefined,
  ): Promise<Address | undefined> {
    const addressFound = this.addresses.find(
      address => address_id === address.id,
    );

    return addressFound;
  }

  public async saveAddress(addressData: IAddressDTO): Promise<Address> {
    const address = new AddressSchema(addressData);

    Object.assign(address, addressData);

    this.addresses.push(address);

    return address;
  }

  public async updateUserAddress(newAddressData: IAddressDTO): Promise<void> {
    if (
      this.addresses.map(address => newAddressData.address_id === address.id)
    ) {
      this.addresses.map(address => newAddressData === address);
    }

    return Object.assign(newAddressData);
  }

  public async deleteUserAddress(addressId: string): Promise<void> {
    const address = this.addresses.map(
      addressCreated => addressId === addressCreated.id,
    );

    if (address) {
      this.addresses.splice(0, 1);
    }
  }

  public async deleteAllUserAddresses(userID: string): Promise<void> {
    const address = this.addresses.map(
      addressCreated => userID === addressCreated.user_id,
    );

    if (address) {
      this.addresses.splice(0, 1);
    }
  }
}

export default FakeAddressesRepository;
