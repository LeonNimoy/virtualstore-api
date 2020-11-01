import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAddressService from '../services/Address/CreateAddressService/CreateAddressService';
import UpdateAddressService from '../services/Address/UpdateAddressService/UpdateAddressService';
import DeleteAddressService from '../services/Address/DeleteAddressService/DeleteAddressService';
import AddressesRepository from '../repositories/AddressesRepository';

export default class AddressesController {
  public async list(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const addresses = new AddressesRepository();
    const addressFound = await addresses.findAllAddresses(id);

    return res.status(200).json(addressFound);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      cep,
      address,
      address_complement,
      neighborhood,
      city,
      state,
    } = req.body;
    const createUserAddress = container.resolve(CreateAddressService);
    await createUserAddress.execute({
      id,
      cep,
      address,
      address_complement,
      neighborhood,
      city,
      state,
    });

    return res.status(200).json({ message: 'Endereço criado!' });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      address_id,
      cep,
      address,
      address_complement,
      neighborhood,
      city,
      state,
    } = req.body;
    const updateAddress = container.resolve(UpdateAddressService);
    const addressUpdated = await updateAddress.execute({
      address_id,
      cep,
      address,
      address_complement,
      neighborhood,
      city,
      state,
    });

    return res.status(200).json(addressUpdated);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { address_id } = req.body;

    const addressDeleted = container.resolve(DeleteAddressService);
    await addressDeleted.execute({ address_id });

    return res.status(200).json({ message: 'Endereço excluído!' });
  }
}
