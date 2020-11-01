import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IAddressDTO from '../../../dtos/IAddressDTO';
import Address from '../../../infra/databases/entities/Address';
import IAddressesProvider from '../../../providers/IAddressesProvider';
import AppError from '../../../../../shared/errors/AppError';

@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesProvider,
  ) {}

  public async execute(addressNewData: IAddressDTO): Promise<Address> {
    const addressFound = await this.addressesRepository.findAddressById(
      addressNewData.address_id,
    );

    switch (addressFound) {
      case null:
        throw new AppError('Cadastro não encontrado', 404);
      case undefined:
        throw new AppError('Cadastro não encontrado', 400);
      default:
    }

    if (addressNewData.address) {
      addressFound.address = addressNewData.address;
    }

    if (addressNewData.cep) {
      addressFound.cep = addressNewData.cep;
    }

    if (addressNewData.address_complement) {
      addressFound.address_complement = addressNewData.address_complement;
    }

    if (addressNewData.neighborhood) {
      addressFound.neighborhood = addressNewData.neighborhood;
    }

    if (addressNewData.city) {
      addressFound.city = addressNewData.city;
    }
    if (addressNewData.state) {
      addressFound.state = addressNewData.state;
    }

    const addressUpdated = await this.addressesRepository.updateUserAddress(
      addressFound,
    );

    switch (addressUpdated) {
      case null:
        throw new AppError('Cadastro não encontrado', 404);
      default:
    }

    return addressUpdated;
  }
}

export default UpdateAddressService;
