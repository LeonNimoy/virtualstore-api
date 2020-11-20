import { Router } from 'express';

import ensureAuthenticated from '@modules/users/middlewares/ensureAuthenticated';
import TransactionsController from '../../controllers/TransactionsController';

const transactionsRouter = Router();
const transactionsController = new TransactionsController();

transactionsRouter.get('/', ensureAuthenticated, transactionsController.list);

export default transactionsRouter;
