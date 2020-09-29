import IProductDTO from './dtos/IProductDTO';
import { Product } from '../models/Product';

class CreateProductService {
  public async execute({
    name,
    tags,
    description,
    image,
    price,
    quantity,
  }: IProductDTO): Promise<Product> {
    const product = new Product({
      name,
      tags,
      description,
      image,
      price,
      quantity,
    });
    await product.save();
    return product;
  }
}

export default CreateProductService;
