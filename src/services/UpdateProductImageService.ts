import { inject, injectable } from 'tsyringe';
import { ProductSchema } from '../databases/mongoose/schemas/ProductSchema';
import DiskStorageProvider from '../container/implementations/S3StorageProvider';
import uploadConfig from '../config/upload';
import IProductEntity from '../entities/IProductEntity';
import IProductsProvider from '../providers/IProductsProvider';

interface IRequest {
  id: string;
  imageFilename: string;
}
@injectable()
class UpdateProductImageService {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductsProvider,
  ) {}

  public async execute({
    id,
    imageFilename,
  }: IRequest): Promise<IProductEntity> {
    const product = await this.productRepository.find(id);
    if (!product) {
      throw new Error('Product not Found');
    }

    const uploadAws = new DiskStorageProvider();

    await uploadAws.saveFile(imageFilename);

    product.image = `https://${uploadConfig.config.disk.bucket}.s3.amazonaws.com/${imageFilename}`;

    this.productRepository.update(product);

    return product;
  }
}

export default UpdateProductImageService;
