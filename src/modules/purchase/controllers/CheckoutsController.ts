import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateCheckoutService from '../services/Checkout/CreateCheckoutService';

export default class CheckoutsController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { token, payment_method, amount } = req.body;

    const createCheckout = container.resolve(CreateCheckoutService);
    await createCheckout.execute({
      customer_id: id,
      payment_token: token,
      payment_method,
      amount,
    });

    return res.status(200).json({
      message: 'Sua compra foi concluída com sucesso .',
    });
  }
}
