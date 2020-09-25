/* eslint-disable no-shadow */
import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('')
export default class IndexController {
  @Get('')
  public async getProducts(_: Request, resp: Response): Promise<void> {
    try {
      resp.status(200).send('API is working!!');
    } catch (error) {
      resp.status(500).send({ error: 'Something went wrong' });
    }
  }
}
