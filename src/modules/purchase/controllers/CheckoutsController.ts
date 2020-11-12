import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateCheckoutService from '../services/CreateCheckoutService';

export default class CheckoutsController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { cardHash, purchaseAmount, addressId, productId } = req.body;

    const createCheckout = container.resolve(CreateCheckoutService);
    await createCheckout.execute({
      customerId: id,
      cardHash,
      productId,
      purchaseAmount,
      addressId,
    });

    return res.status(200).json({ message: 'Compra realizada com sucesso' });
  }
}
