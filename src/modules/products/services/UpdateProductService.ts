import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

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

    if (productNewData.name) {
      product.name = productNewData.name;
    }

    if (productNewData.tags) {
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
