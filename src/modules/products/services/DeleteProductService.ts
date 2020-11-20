import { injectable, inject } from 'tsyringe';

import IProductsProvider from '../providers/IProductsProvider';
import AppError from '../../../shared/errors/AppError';
// import DiskStorageProvider from '../../../shared/container/implementations/S3StorageProvider';

interface Request {
  id: string | undefined;
}
@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductsProvider,
  ) {}

  public async execute({ id }: Request): Promise<void> {
    const product = await this.productRepository.findProductById(id);

    switch (product) {
      case null:
        throw new AppError('Produto não encontrado', 404);
      case undefined:
        throw new AppError('Produto não identificado', 404);
      default:
    }

    // const fileUploaded = new DiskStorageProvider();
    // await fileUploaded.deleteFile(product.image);
    await this.productRepository.deleteProduct(product);
  }
}

export default DeleteProductService;
