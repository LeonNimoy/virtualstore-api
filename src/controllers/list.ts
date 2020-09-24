import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('list')
export default class ListController {
  @Get('')
  public getProductsForLoggedUser(_: Request, resp: Response): void {
    resp.send([
      {
        product: [
          {
            name: 'Mesa',
            tag: ['mesa', 'madeira'],
            description: 'mesa de jantar para quatro pessoas',
            value: 225.99,
            quantity: 46,
          },
        ],
      },

      {
        product: [
          {
            name: 'cadeira',
            tag: ['festa', 'cadeira'],
            description: 'cadeira de festa ultra resistente',
            value: 56.99,
            quantity: 16,
          },
        ],
      },
    ]);
  }
}
