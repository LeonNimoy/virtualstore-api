/* eslint-disable no-shadow */
import { Controller, Post, Get, Put, Delete } from '@overnightjs/core';
import { Product } from '@src/models/Product';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

@Controller('products')
export default class ProductsController {
  @Get('')
  public async getProducts(_: Request, resp: Response): Promise<void> {
    try {
      const products = await Product.find({});
      resp.status(200).json(products);
    } catch (error) {
      resp.status(500).json({ error: 'Something went wrong' });
    }
  }

  @Get(':id')
  public async getProduct(req: Request, resp: Response): Promise<void> {
    try {
      Product.findById(req.params.id, (err, product) => {
        if (err) {
          throw new Error('Product not found!');
        } else {
          resp.status(200).json(product);
        }
      });
    } catch (error) {
      resp.status(500).json({ error: 'Something went wrong' });
    }
  }

  @Post('')
  public async createProduct(req: Request, resp: Response): Promise<void> {
    try {
      const product = new Product(req.body);
      const result = await product.save();
      resp.status(201).json(result);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        resp.status(422).json({ error: error.message });
      } else {
        resp.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  @Put(':id')
  public async updateProduct(req: Request, resp: Response): Promise<void> {
    try {
      // const { name, tag, description, value, quantity } = req.body;
      Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).exec((err, product) => {
        if (err) {
          throw new Error('Product not found!');
        } else {
          resp.status(201).json(product);
        }
      });
    } catch (err) {
      resp.status(400).json({ error: err.message });
    }
  }

  @Delete(':id')
  public async deleteProduct(req: Request, resp: Response): Promise<void> {
    try {
      const { id } = req.params;

      const product = await Product.findByIdAndRemove(id);

      if (!product) {
        throw new Error('Product not found!');
      }

      resp.status(200).json({ message: 'Product deleted!' });
    } catch (err) {
      resp.status(400).json({ error: err.message });
    }
  }
}
