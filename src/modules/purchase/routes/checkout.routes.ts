import { Router } from 'express';

import CheckoutsController from '../controllers/CheckoutsController';
import ensureAuthenticated from '../../users/middlewares/ensureAuthenticated';

const checkoutsRouter = Router();
const checkoutsController = new CheckoutsController();

checkoutsRouter.post('/', ensureAuthenticated, checkoutsController.store);

export default checkoutsRouter;
