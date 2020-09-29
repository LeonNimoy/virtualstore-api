import { Product } from '../models/Product';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const product = await Product.findById(id);

    if (!product) {
      throw new Error('Product not Found');
    }

    await product.remove();
    return product;
  }
}

export default DeleteProductService;
