import { container } from 'tsyringe';
import { Request, Response } from 'express';

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
  }

  public async update(req: Request, res: Response): Promise<Response> {
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
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const productDeleted = container.resolve(DeleteProductService);
    await productDeleted.execute({ id });

    return res.status(200).json({ message: 'Product deleted!' });
  }
}
