import { container } from 'tsyringe';
import { Request, Response } from 'express';
import crypto from 'crypto';

// import AppError from '@shared/errors/AppError';
import CreateGuestCartService from '../services/GuestCart/CreateGuestCartService';
import UpdateGuestCartService from '../services/GuestCart/UpdateGuestCartService';
import GuestCartsRepository from '../repositories/GuestCartsRepository';

export default class GuestsCartsController {
  public async list(req: Request, res: Response): Promise<Response> {
    const { guest_token } = req.query;
    const guestCartRepository = new GuestCartsRepository();
    const guestTokenStringified = String(guest_token);
    let userToken;

    guest_token
      ? (userToken = await guestCartRepository.findGuestCartByGuestToken(
          guestTokenStringified,
        ))
      : (userToken = crypto.randomBytes(16).toString('hex'));

    return res.status(200).json(userToken);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { guest_Token } = req.body;

    const createGuestCart = container.resolve(CreateGuestCartService);
    const guestCart = await createGuestCart.execute(guest_Token);

    return res.status(200).json(guestCart);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { products } = req.body;

    const updateGuestCart = container.resolve(UpdateGuestCartService);
    const guestCartUpdated = await updateGuestCart.execute({
      products,
      guestToken: id,
    });

    return res.status(200).json(guestCartUpdated);
  }
}
