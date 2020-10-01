import { Router } from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import uploadConfig from '../config/upload';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import UpdateProductImageService from '../services/UpdateProductImageService';
import DeleteProductService from '../services/DeleteProductService';
import { Product } from '../models/Product';

const productsRouter = Router();
const upload = multer(uploadConfig.multer);

productsRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

productsRouter.get('/:id', async (req, res) => {
  try {
    Product.findById(req.params.id, (err, product) => {
      if (err) {
        throw new Error('Product not found!');
      } else {
        res.status(200).json(product);
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

productsRouter.post('/', async (req, res) => {
  const { name, tags, description, image, price, quantity } = req.body;

  try {
    const createProduct = new CreateProductService();
    const product = await createProduct.execute({
      name,
      tags,
      description,
      image,
      price,
      quantity,
    });
    return res.status(201).json(product);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

productsRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, tags, description, image, price, quantity } = req.body;
    const updateProduct = new UpdateProductService();
    const product = await updateProduct.execute({
      id,
      name,
      tags,
      description,
      image,
      price,
      quantity,
    });

    res.status(204).json(product);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(422).json({ err: err.message });
    } else {
      res.status(500).json({ err: 'Internal Server Error' });
    }
  }
});

productsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateProduct = new DeleteProductService();
    await updateProduct.execute({
      id,
    });

    res.status(200).json({ message: 'Product deleted!' });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(422).json({ err: err.message });
    } else {
      res.status(500).json({ err: 'Internal Server Error' });
    }
  }
});

productsRouter.patch('/image/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const updateProductImage = new UpdateProductImageService();
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
});

export default productsRouter;
