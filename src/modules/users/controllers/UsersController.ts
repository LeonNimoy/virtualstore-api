import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import DeleteUserService from '../services/DeleteUserService';

export default class UsersController {
  public async list(req: Request, res: Response): Promise<Response> {
    if (req.params.id) {
      const findUser = new UsersRepository();
      const userFound = await findUser.findById(req.params.id);

      return res.status(200).json(userFound);
    }

    const users = new UsersRepository();
    const usersFound = await users.find();

    return res.status(200).json(usersFound);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, phone, cpf, address } = req.body;

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
  }

  public async update(req: Request, res: Response): Promise<Response> {
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
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userDeleted = container.resolve(DeleteUserService);
    await userDeleted.execute({ id });

    return res.status(200).json({ message: 'user deleted!' });
  }
}
