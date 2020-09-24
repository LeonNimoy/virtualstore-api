import { Controller, Get } from '@overnightjs/core';
import { Product } from '@src/models/Product';
import { Request, Response } from 'express';

// const productModel = new Product();

@Controller('list')
export default class ListController {
  @Get('')
  public async getProductsForLoggedUser(
    _: Request,
    resp: Response,
  ): Promise<void> {
    try {
      const products = await Product.find({});
      resp.status(200).send(products);
    } catch (error) {
      resp.status(500).send({ error: 'Something went wrong' });
    }
  }
}
