import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IProductDTO from '../dtos/IProductDTO';
import IProductEntity from '../entities/IProductEntity';
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
  }: IProductDTO): Promise<IProductEntity> {
    const checkName = await this.productRepository.checkName(name);

    if (checkName) {
      const product = this.productRepository.save({
        name,
        tags,
        description,
        image,
        price,
        quantity,
      });
      return product;
    }

    throw new AppError('Name for product already used!', 409);
  }
}

export default CreateProductService;
