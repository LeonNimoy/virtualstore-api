import { Product } from '../models/Product';
import DiskStorageProvider from '../container/implementations/S3StorageProvider';
import uploadConfig from '../config/upload';

interface IRequest {
  id: string;
  imageFilename: string;
}

class UpdateProductImageService {
  public async execute({ id, imageFilename }: IRequest): Promise<Product> {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Product not Found');
    }

    const uploadAws = new DiskStorageProvider();

    await uploadAws.saveFile(imageFilename);

    product.image = `https://${uploadConfig.config.disk.bucket}.s3.amazonaws.com/${imageFilename}`;

    product.save();

    return product;
  }
}

export default UpdateProductImageService;
