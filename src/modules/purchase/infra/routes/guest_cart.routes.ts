import { Router } from 'express';

import GuestsCartController from '../../controllers/GuestCartController';

const cartsRouter = Router();
const guests_cartsController = new GuestsCartController();

cartsRouter.get('/', guests_cartsController.list);
cartsRouter.post('/', guests_cartsController.create);
cartsRouter.put('/:id', guests_cartsController.update);

export default cartsRouter;
