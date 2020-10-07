import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { container } from 'tsyringe';

import UpdateProductImageService from '../services/UpdateProductImageService';

export default class ProductImageController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const updateProductImage = container.resolve(UpdateProductImageService);
      const productImage = await updateProductImage.execute({
        imageFilename: req.file.filename,
      });
      return res.status(201).json(productImage);
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(422).json({ err: err.message });
      }
      return res.status(500).json({ err: 'Internal Server Error' });
    }
  }
}
