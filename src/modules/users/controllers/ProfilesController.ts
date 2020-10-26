import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '../services/Profile/UpdateProfileService/UpdateProfileService';

export default class ProfilesController {
  public async post(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      phone,
      cpf,
      cep,
      address,
      address_2,
      neighborhood,
      city,
      state,
    } = req.body;
    const updateUser = container.resolve(UpdateProfileService);
    await updateUser.execute({
      id,
      phone,
      cpf,
      cep,
      address,
      address_2,
      neighborhood,
      city,
      state,
    });

    return res.status(200).json({ message: 'User profile Updated' });
  }
}
