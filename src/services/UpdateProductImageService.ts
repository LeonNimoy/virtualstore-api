import { Product } from '../models/Product';
import DiskStorageProvider from '../container/implementations/S3StorageProvider';

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

    product.image = imageFilename;

    product.save();

    return product;

    // if (product.image) {
    //   const productImageFilePath = path.join(
    //     uploadConfig.tmpFolder,
    //     product.image,
    //   );
    //   const productImageFileExists = await fs.promises.stat(
    //     productImageFilePath,
    //   );

    //   if (productImageFileExists) {
    //     await fs.promises.unlink(productImageFilePath);
    //   }
    // }
  }
}

export default UpdateProductImageService;
