import { Request, Response } from 'express';
import { container } from 'tsyringe';
import mongoose from 'mongoose';

import { UserSchema } from '../databases/mongoose/schemas/UserSchema';
import CreateUserService from '../services/CreateUserService';

export default class UsersController {
  public async list(req: Request, res: Response): Promise<Response> {
    try {
      if (req.params.id) {
        const user = await UserSchema.findById(req.params.id);
        return res.status(200).json(user);
      }
      const users = await UserSchema.find({});

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, phone, cpf, address } = req.body;

    try {
      const createUser = container.resolve(CreateUserService);
      const user = await createUser.execute({
        name,
        email,
        password,
        phone,
        cpf,
        address,
      });
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
