import { Router } from 'express';

import ensureAuthenticated from '@modules/users/middlewares/ensureAuthenticated';
import CartsController from '../../controllers/CartsController';

const cartsRouter = Router();
const cartsController = new CartsController();

cartsRouter.get('/', ensureAuthenticated, cartsController.list);
cartsRouter.put('/', ensureAuthenticated, cartsController.update);

export default cartsRouter;
