import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IStorageProvider from '../../../shared/container/entities/IStorageProvider';
import uploadConfig from '../../../config/upload';

interface IRequest {
  imageFilename: string;
}
@injectable()
class UpdateProductImageService {
  constructor(
    @inject('S3StorageProvider')
    private s3StorageProvider: IStorageProvider,
  ) {}

  public async execute({ imageFilename }: IRequest): Promise<string> {
    const fileUpdated = await this.s3StorageProvider.saveFile(imageFilename);

    if (!fileUpdated) {
      throw new AppError('Invalid file!', 400);
    }

    const imageUrl = `https://${uploadConfig.config.disk.bucket}.s3.amazonaws.com/${imageFilename}`;

    return imageUrl;
  }
}

export default UpdateProductImageService;
