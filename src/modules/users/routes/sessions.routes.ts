import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const sessionsRouter = Router();
const sessionController = new SessionsController();

sessionsRouter.get('/', ensureAuthenticated, sessionController.list);
sessionsRouter.post('/', sessionController.create);

export default sessionsRouter;
