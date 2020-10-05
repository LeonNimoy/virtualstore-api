import fs from 'fs';
import path from 'path';
import mime from 'mime';
import aws, { S3 } from 'aws-sdk';

import uploadConfig from '../../config/upload';

class DiskStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalPath);

    const fileTypes = /jpg|jpeg|png/;

    const filesChecker = fileTypes.test(path.extname(file));

    const ContentType = mime.getType(originalPath);

    if (!ContentType || !filesChecker) {
      throw new Error('Type file not valid');
    }

    await this.client
      .putObject({
        Bucket: uploadConfig.config.disk.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.disk.bucket,
        Key: file,
      })
      .promise();
  }
}

export default DiskStorageProvider;
