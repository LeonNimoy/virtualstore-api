import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AddressDataValidatorProvider from '@modules/users/providers/Validations/AddressDataValidatorProvider';
import AppError from '@shared/errors/AppError';
import IAddressesProvider from '@modules/users/providers/IAddressesProvider';
import IAddressDTO from '../../../dtos/IAddressDTO';
import IUsersProvider from '../../../providers/IUsersProvider';
import Address from '../../../infra/databases/entities/Address';

@injectable()
class CreateAddressService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersProvider,

    @inject('AddressesRepository')
    private addressesRepository: IAddressesProvider,
  ) {}

  public async execute({
    id,
    cep,
    address,
    address_complement,
    address_number,
    neighborhood,
    city,
    state,
  }: IAddressDTO): Promise<Address> {
    const findAValidUser = await this.userRepository.findById(id);

    switch (findAValidUser) {
      case null:
        throw new AppError('Cadastro não identificado', 404);
      case undefined:
        throw new AppError('Cadastro não encontrado', 400);
      default:
    }

    const addressDataValidator = new AddressDataValidatorProvider();

    const checkAddressNumberFormat = await addressDataValidator.validateAddressNumber(
      address_number,
    );

    if (!checkAddressNumberFormat)
      throw new AppError('Número de endereço inválido');

    const checkCepFormat = await addressDataValidator.validateCep(cep);

    if (!checkCepFormat) throw new AppError('Cep de endereço inválido');

    const addressCreated = await this.addressesRepository.saveAddress({
      id,
      cep,
      address,
      address_complement,
      address_number,
      neighborhood,
      city,
      state,
    });

    return addressCreated;
  }
}

export default CreateAddressService;
