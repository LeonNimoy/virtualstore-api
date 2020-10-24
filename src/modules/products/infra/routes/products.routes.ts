import { Router } from 'express';
import multer from 'multer';

import ProductsController from '../../controllers/ProductsController';
import ProductImageController from '../../controllers/ProductImageController';
import uploadConfig from '../../../../config/upload';

const productsRouter = Router();
const upload = multer(uploadConfig.multer);
const productsController = new ProductsController();
const productImageController = new ProductImageController();

productsRouter.get('/:id?', productsController.list);

productsRouter.post('/', productsController.create);

productsRouter.put('/:id', productsController.update);

productsRouter.delete('/:id', productsController.delete);

productsRouter.post(
  '/image',
  upload.single('image'),
  productImageController.update,
);

export default productsRouter;
