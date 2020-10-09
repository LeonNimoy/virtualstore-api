import { container } from 'tsyringe';
import { Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const authenticateUser = container.resolve(AuthenticateUserService);

      const { user, token } = await authenticateUser.execute({
        email,
        password,
      });

      const authUser = user.email;

      return res.status(200).json({ authUser, token });
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(500).json('Something Wrong');
      }
      return res.status(409).json({ error: err.message });
    }
  }
}
