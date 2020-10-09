import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IProductDTO from '../dtos/IProductDTO';
import IProductEntity from '../entities/IProductEntity';
import IProductsProvider from '../providers/IProductsProvider';

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
    const product = this.productRepository.save({
      name,
      tags,
      description,
      image,
      price,
      quantity,
    });
    await product;
    return product;
  }
}

export default CreateProductService;
