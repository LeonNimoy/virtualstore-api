import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IProductDTO from '../dtos/IProductDTO';
import Product from '../infra/databases/entities/Product';
import IProductsProvider from '../providers/IProductsProvider';
import AppError from '../../../shared/errors/AppError';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductsProvider,
  ) {}

  public async execute({
    name,
    tags,
    description,
    image,
    price,
    quantity,
  }: IProductDTO): Promise<Product> {
    const checkName = await this.productRepository.checkExistentNameProduct(
      name,
    );

    if (checkName) {
      const priceFormatted = Number(price.toFixed(2));
      const product = await this.productRepository.saveProduct({
        name,
        tags,
        description,
        image,
        price: priceFormatted,
        quantity,
      });

      return product;
    }

    throw new AppError('Já existe um produto com este nome', 409);
  }
}

export default CreateProductService;
