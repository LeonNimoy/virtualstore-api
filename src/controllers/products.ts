import { Controller, Post, Get } from '@overnightjs/core';
import { Product } from '@src/models/Product';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

@Controller('products')
export default class ProductsController {
  @Get('')
  public async getProducts(_: Request, resp: Response): Promise<void> {
    try {
      const products = await Product.find({});
      resp.status(200).send(products);
    } catch (error) {
      resp.status(500).send({ error: 'Something went wrong' });
    }
  }

  @Post('')
  public async create(req: Request, resp: Response): Promise<void> {
    try {
      const product = new Product(req.body);
      const result = await product.save();
      resp.status(201).send(result);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        resp.status(422).send({ error: error.message });
      } else {
        resp.status(500).send({ error: 'Internal Server Error' });
      }
    }
  }
}
