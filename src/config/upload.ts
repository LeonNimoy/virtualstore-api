import multer, { StorageEngine } from 'multer';
import path from 'path';

import { ProductSchema } from '../databases/mongoose/schemas/ProductSchema';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const productId = new ProductSchema();

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
        const fileId = productId.id;
        const filename = `${fileId}-${file.originalname}`;
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
