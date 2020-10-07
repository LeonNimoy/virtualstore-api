import { Request, Response } from 'express';

import { UserSchema } from '../mongoose/schemas/UserSchema';

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
}
