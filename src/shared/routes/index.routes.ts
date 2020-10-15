import { Router } from 'express';

import productsRouter from '../../modules/products/routes/products.routes';
import usersRouter from '../../modules/users/routes/users.routes';
import sessionsRouter from '../../modules/users/routes/sessions.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.use('/', async (req, res) => {
  try {
    res.status(200).send('API is working!!!');
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default routes;
