import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateCartService from '../services/Cart/UpdateCartService';

export default class CartsController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const updateCart = container.resolve(UpdateCartService);
    await updateCart.execute({
      user_id: id,
      products: [req.body],
    });

    return res.status(200).json({ message: 'Carrinho atualizado' });
  }
}
