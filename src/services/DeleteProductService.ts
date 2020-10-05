import { injectable, inject } from 'tsyringe';

import IProductsProvider from '../providers/IProductsProvider';

interface Request {
  id: string;
}
@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductsProvider,
  ) {}

  public async execute({ id }: Request): Promise<void> {
    const product = await this.productRepository.find(id);

    if (!product) {
      throw new Error('Product not Found');
    }

    await this.productRepository.delete(product);
  }
}

export default DeleteProductService;
