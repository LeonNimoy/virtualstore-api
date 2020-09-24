import { Controller, Get, Post, Put } from '@overnightjs/core';
import { Response, Request } from 'express';
import { User } from '@src/models/User';
import AuthService from '@src/services/authService';
import BaseController from '.';

@Controller('users')
export default class UsersController extends BaseController {
  @Get('')
  public async getProducts(req: Request, resp: Response): Promise<void> {
    try {
      const users = await User.find({});
      resp.status(200).send(users);
    } catch (error) {
      resp.status(500).send({ error: 'Something went wrong' });
    }
  }

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

  @Post('authenticate')
  public async authenticate(req: Request, res: Response): Promise<Response> {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({
        code: 401,
        error: 'User not found!',
      });
    }
    if (
      !(await AuthService.comparePasswords(req.body.password, user.password))
    ) {
      return res
        .status(401)
        .send({ code: 401, error: 'Password does not match!' });
    }
    const token = AuthService.generateToken(user.toJSON());

    return res.send({ ...user.toJSON(), ...{ token } });
  }

  // @Put('')
  // public async editUser(req: Request, resp: Response): Promise<void> {
  //   try {
  //     if ()
  //     const user = new User(req.body);
  //     const newUser = await user.save();
  //     resp.status(201).send(newUser);
  //   } catch (error) {
  //     this.sendCreateUpdateErrorResponse(resp, error);
  //   }
  // }
}
