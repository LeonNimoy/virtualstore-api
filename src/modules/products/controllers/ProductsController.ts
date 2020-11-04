import { container } from 'tsyringe';
import { Request, Response } from 'express';

import DeleteProductService from '../services/DeleteProductService';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import TypedPaginateModel from '../../../shared/utils/ModelPaginationProvider';

export default class ProductsController {
  public async list(req: Request, res: Response): Promise<Response> {
    const { page = 1, size = 20, product_id } = req.query;
    const pageNumber = Number(page);
    const sizeNumber = Number(size);
    const ProductWithPagination = TypedPaginateModel('Product');
    let productsPaginated;

    !product_id
      ? (productsPaginated = await ProductWithPagination.paginate(
          {},
          { page: pageNumber, limit: sizeNumber, sort: { _id: '-1' } },
        ))
      : (productsPaginated = await ProductWithPagination.paginate(
          {},
          { sort: { _id: '-1' } },
        ));

    return res.status(200).json(productsPaginated);
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
