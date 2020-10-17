import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import IProductDTO from '../dtos/IProductDTO';
import IProductEntity from '../entities/IProductEntity';
import IProductsProvider from '../providers/IProductsProvider';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductsProvider,
  ) {}

  public async execute(productNewData: IProductDTO): Promise<IProductEntity> {
    const product = await this.productRepository.findById(productNewData.id);

    if (product === undefined) {
      throw new AppError('User not found', 404);
    }

    if (productNewData.name) {
      product.name = productNewData.name;
    }

    if (productNewData.tags.length > 0) {
      product.tags = productNewData.tags;
    }

    if (productNewData.description) {
      product.description = productNewData.description;
    }

    if (productNewData.image) {
      product.image = productNewData.image;
    }

    if (productNewData.price) {
      product.price = productNewData.price;
    }

    if (productNewData.quantity) {
      product.quantity = productNewData.quantity;
    }

    const productUpdated = await this.productRepository.update(product);

    return productUpdated;
  }
}

export default UpdateProductService;
