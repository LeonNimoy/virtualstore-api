import { Router } from 'express';

import productsRouter from '@modules/products/infra/routes/products.routes';
import usersRouter from '@modules/users/infra/routes/users.routes';
import sessionsRouter from '@modules/users/infra/routes/sessions.routes';
import addressesRouter from '@modules/users/infra/routes/addresses.routes';
import checkoutsRouter from '@modules/purchase/infra/routes/checkout.routes';
import cartsRouter from '@modules/purchase/infra/routes/cart.routes';
import guests_cartsRouter from '@modules/purchase/infra/routes/guest_cart.routes';
import transactionsRouter from '@modules/purchase/infra/routes/transaction.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/addresses', addressesRouter);
routes.use('/checkouts', checkoutsRouter);
routes.use('/carts', cartsRouter);
routes.use('/guest_carts', guests_cartsRouter);
routes.use('/transactions', transactionsRouter);

routes.use('/', async (req, res) => {
  try {
    res.status(200).send('API is working!!!');
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default routes;
