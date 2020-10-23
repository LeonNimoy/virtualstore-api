import { Router } from 'express';

import productsRouter from '../../modules/products/routes/products.routes';
import usersRouter from '../../modules/users/infra/routes/users.routes';
import sessionsRouter from '../../modules/users/infra/routes/sessions.routes';
import profilesRouter from '../../modules/users/infra/routes/profiles.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profiles', profilesRouter);

routes.use('/', async (req, res) => {
  try {
    res.status(200).send('API is working!!!');
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default routes;
