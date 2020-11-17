import { container } from 'tsyringe';
import { Request, Response } from 'express';

import AppError from '@shared/errors/AppError';
import UpdateCartService from '../services/Cart/UpdateCartService';
import CartsRepository from '../repositories/CartsRepository';

export default class CartsController {
  public async list(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const findUserCart = new CartsRepository();
    const userCartFound = await findUserCart.findCartByUserId(id);

    switch (userCartFound) {
      case undefined:
        throw new AppError('Não foi possível localizar o seu carrinho', 400);
      default:
        return res.status(200).json(userCartFound);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { products } = req.body;

    const updateCart = container.resolve(UpdateCartService);
    await updateCart.execute({
      user_id: id,
      products,
    });

    return res.status(200).json({ message: 'Carrinho atualizado' });
  }
}
