import multer, { StorageEngine } from 'multer';
import path from 'path';

const tmpFolder = path.join(process.cwd(), '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const filename = file.originalname;
        return callback(null, filename);
      },
    }),
  },

  config: {
    disk: {
      bucket: process.env.AWS_BUCKET_PRODUCT_IMAGE,
    },
  },
} as IUploadConfig;
