import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProductImageService from '../services/UpdateProductImageService';

export default class ProductImageController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateProductImage = container.resolve(UpdateProductImageService);
    const productImage = await updateProductImage.execute({
      imageFilename: req.file.filename,
    });
    return res.status(201).json(productImage);
  }
}
