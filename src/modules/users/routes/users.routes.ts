import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const productsRouter = Router();
const userController = new UsersController();

productsRouter.get('/:id?', userController.list);

export default productsRouter;
