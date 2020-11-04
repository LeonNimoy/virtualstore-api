import { injectable, inject } from 'tsyringe';

import IAddressesProvider from '../../../providers/IAddressesProvider';
import AppError from '../../../../../shared/errors/AppError';

interface Request {
  address_id: string | undefined;
}

@injectable()
class DeleteAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressRepository: IAddressesProvider,
  ) {}

  public async execute({ address_id }: Request): Promise<void> {
    const addressFound = await this.addressRepository.findAddressById(
      address_id,
    );

    switch (addressFound) {
      case null:
        throw new AppError('Endereço não encontrado', 404);
      case undefined:
        throw new AppError('Endereço não identificado', 404);
      default:
    }

    await this.addressRepository.deleteUserAddress(addressFound.id);
  }
}

export default DeleteAddressService;
