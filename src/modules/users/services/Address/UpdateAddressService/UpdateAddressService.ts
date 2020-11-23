import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AddressDataValidatorProvider from '@modules/users/providers/Validations/AddressDataValidatorProvider';
import AppError from '@shared/errors/AppError';
import IAddressDTO from '../../../dtos/IAddressDTO';
import IAddressesProvider from '../../../providers/IAddressesProvider';

@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesProvider,
  ) {}

  public async execute(addressNewData: IAddressDTO): Promise<void> {
    const addressDataValidator = new AddressDataValidatorProvider();

    if (addressNewData.address_number) {
      const checkAddressNumberFormat = await addressDataValidator.validateAddressNumber(
        addressNewData.address_number,
      );

      if (!checkAddressNumberFormat)
        throw new AppError('Número de endereço inválido');
    }

    if (addressNewData.cep) {
      const checkCepFormat = await addressDataValidator.validateCep(
        addressNewData.cep,
      );

      if (!checkCepFormat) throw new AppError('Cep de endereço inválido');
    }

    await this.addressesRepository.updateUserAddress(addressNewData);
  }
}

export default UpdateAddressService;
