import { Router } from 'express';

import UsersController from '../../controllers/UsersController';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';
import ensureDataCompleteness from '../../middlewares/ensureDataCompleteness';

const usersRouter = Router();
const userController = new UsersController();

usersRouter.get('/:id?', userController.list);
usersRouter.post('/', ensureDataCompleteness, userController.create);
usersRouter.put('/', ensureAuthenticated, userController.update);
usersRouter.delete('/', ensureAuthenticated, userController.delete);

export default usersRouter;
