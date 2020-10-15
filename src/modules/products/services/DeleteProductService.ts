import { injectable, inject } from 'tsyringe';

import IProductsProvider from '../providers/IProductsProvider';
// import DiskStorageProvider from '../../../shared/container/implementations/S3StorageProvider';

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
    const product = await this.productRepository.findById(id);

    // const fileUploaded = new DiskStorageProvider();
    // await fileUploaded.deleteFile(product.image);
    await this.productRepository.delete(product);
  }
}

export default DeleteProductService;
