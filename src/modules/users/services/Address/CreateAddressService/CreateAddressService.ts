import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IAddressesProvider from '../../../providers/IAddressesProvider';
import AppError from '../../../../../shared/errors/AppError';
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
