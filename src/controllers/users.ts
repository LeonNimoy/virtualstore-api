import { Controller, Post } from '@overnightjs/core';
import { Response, Request } from 'express';
import { User } from '@src/models/User';
import BaseController from '.';

@Controller('users')
export default class UsersController extends BaseController {
  @Post('')
  public async create(req: Request, resp: Response): Promise<void> {
    try {
      const user = new User(req.body);
      const newUser = await user.save();
      resp.status(201).send(newUser);
    } catch (error) {
      this.sendCreateUpdateErrorResponse(resp, error);
    }
  }
}
