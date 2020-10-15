import { container } from 'tsyringe';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { ProductSchema } from '../databases/mongoose/schemas/ProductSchema';
import DeleteProductService from '../services/DeleteProductService';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import ProductsRepository from '../repositories/ProductsRepository';

export default class ProductsController {
  public async list(req: Request, res: Response): Promise<Response> {
    if (req.params.id) {
      const findProduct = new ProductsRepository();
      const productFound = await findProduct.findById(req.params.id);
      return res.status(200).json(productFound);
    }

    const products = new ProductsRepository();
    const productsFound = await products.find();

    return res.status(200).json(productsFound);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, tags, description, image, price, quantity } = req.body;

    try {
      const createProduct = container.resolve(CreateProductService);
      const product = await createProduct.execute({
        name,
        tags,
        description,
        image,
        price,
        quantity,
      });
      return res.status(201).json(product);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, tags, description, image, price, quantity } = req.body;
      const updateProduct = container.resolve(UpdateProductService);
      const product = await updateProduct.execute({
        id,
        name,
        tags,
        description,
        image,
        price,
        quantity,
      });

      return res.status(200).json(product);
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(422).json({ err: err.message });
      }
      return res.status(500).json({ err: 'Internal Server Error' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const productDeleted = container.resolve(DeleteProductService);
      await productDeleted.execute({ id });

      return res.status(200).json({ message: 'Product deleted!' });
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(422).json({ err: err.message });
      }
      return res.status(500).json({ err: 'Internal Server Error' });
    }
  }
}
