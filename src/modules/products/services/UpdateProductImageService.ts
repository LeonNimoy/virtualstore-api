import DiskStorageProvider from '../../../shared/container/implementations/S3StorageProvider';
import uploadConfig from '../../../config/upload';

interface IRequest {
  imageFilename: string;
}

class UpdateProductImageService {
  public async execute({ imageFilename }: IRequest): Promise<string> {
    const fileUploaded = new DiskStorageProvider();

    await fileUploaded.saveFile(imageFilename);

    const imageUrl = `https://${uploadConfig.config.disk.bucket}.s3.amazonaws.com/${imageFilename}`;

    return imageUrl;
  }
}

export default UpdateProductImageService;
