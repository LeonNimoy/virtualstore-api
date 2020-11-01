import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IAddressesProvider from '../../../providers/IAddressesProvider';
import AppError from '../../../../../shared/errors/AppError';
import IAddressDTO from '../../../dtos/IAddressDTO';
import IUsersProvider from '../../../providers/IUsersProvider';

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
    neighborhood,
    city,
    state,
  }: IAddressDTO): Promise<void> {
    const findAValidUser = await this.userRepository.findById(id);

    switch (findAValidUser) {
      case null:
        throw new AppError('Cadastro não identificado', 404);
      case undefined:
        throw new AppError('Cadastro não encontrado', 400);
      default:
    }

    await this.addressesRepository.saveAddress({
      id,
      cep,
      address,
      address_complement,
      neighborhood,
      city,
      state,
    });
  }
}

export default CreateAddressService;
