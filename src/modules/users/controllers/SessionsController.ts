import { container } from 'tsyringe';
import { Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    const { name, address, cpf, id, phone } = user;

    return res
      .status(200)
      .json({ id, name, email, address, cpf, phone, token });
  }
}
