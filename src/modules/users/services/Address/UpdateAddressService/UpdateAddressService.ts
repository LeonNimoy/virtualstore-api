import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IAddressDTO from '../../../dtos/IAddressDTO';
import IAddressesProvider from '../../../providers/IAddressesProvider';

@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesProvider,
  ) {}

  public async execute(addressNewData: IAddressDTO): Promise<void> {
    await this.addressesRepository.updateUserAddress(addressNewData);
  }
}

export default UpdateAddressService;
