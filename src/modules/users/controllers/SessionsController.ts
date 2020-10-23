import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UsersRepository from '../repositories/UsersRepository';

import AuthenticateUserService from '../services/Authtenticate/AuthenticateUserService';

export default class SessionsController {
  public async list(req: Request, res: Response): Promise<Response> {
    const findUser = new UsersRepository();
    const user = await findUser.findById(req.params.id);

    return res.status(200).json(user);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    const { name, id } = user;

    return res.status(200).json({ id, name, email, token });
  }
}
