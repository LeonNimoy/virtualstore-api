import { Router } from 'express';

import ensureAuthenticated from '@modules/users/middlewares/ensureAuthenticated';
import CheckoutsController from '../../controllers/CheckoutsController';

const checkoutsRouter = Router();
const checkoutsController = new CheckoutsController();

checkoutsRouter.post('/', ensureAuthenticated, checkoutsController.store);

export default checkoutsRouter;
