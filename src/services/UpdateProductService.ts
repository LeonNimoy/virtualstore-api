import { Product } from '../models/Product';
import IProductDTO from './dtos/IProductDTO';

class CreateProductService {
  public async execute({
    id,
    name,
    tags,
    description,
    image,
    price,
    quantity,
  }: IProductDTO): Promise<Product> {
    const product = await Product.findById(id);

    if (!product) {
      throw new Error('Product not Found');
    }

    if (name) {
      product.name = name;
    }
    if (tags) {
      product.tags = tags;
    }
    if (description) {
      product.description = description;
    }
    if (image) {
      product.image = image;
    }
    if (price) {
      product.price = price;
    }
    if (quantity) {
      product.quantity = quantity;
    }

    await product.save();
    return product;
  }
}

export default CreateProductService;
