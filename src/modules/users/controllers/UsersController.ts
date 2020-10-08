import { Request, Response } from 'express';
import { container } from 'tsyringe';
import mongoose from 'mongoose';

import { UserSchema } from '../databases/mongoose/schemas/UserSchema';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import DeleteUserService from '../services/DeleteUserService';

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
      await createUser.execute({
        name,
        email,
        password,
        phone,
        cpf,
        address,
      });

      return res.status(201).json({ name, email, phone, cpf, address });
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(500).json('Something Wrong');
      }
      return res.status(409).json({ error: err.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, email, password, phone, cpf, address } = req.body;
      const updateUser = container.resolve(UpdateUserService);
      const user = await updateUser.execute({
        id,
        name,
        email,
        password,
        phone,
        cpf,
        address,
      });

      return res.status(200).json(user);
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(422).json({ err: err.message });
      }
      return res.status(500).json({ err: 'Internal Server Error' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const userDeleted = container.resolve(DeleteUserService);
      await userDeleted.execute({ id });

      return res.status(200).json({ message: 'user deleted!' });
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(422).json({ err: err.message });
      }
      return res.status(500).json({ err: 'Internal Server Error' });
    }
  }
}
