import { Router } from 'express';

import productsRouter from '../../routes/products.routes';

const routes = Router();

routes.use('/products', productsRouter);

routes.use('/', async (req, res) => {
  try {
    res.status(200).send('API is working!!');
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default routes;
