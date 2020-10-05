import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { container } from 'tsyringe';
import UpdateProductImageService from '../services/UpdateProductImageService';

export default class ProductImageController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updateProductImage = container.resolve(UpdateProductImageService);
      const product = await updateProductImage.execute({
        id,
        imageFilename: req.file.filename,
      });
      return res.json(product);
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(422).json({ err: err.message });
      }
      return res.status(500).json({ err: 'Internal Server Error' });
    }
  }
}
