import { Router } from 'express';

import UsersController from '../../controllers/UsersController';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';
import ensureDataValidation from '../../middlewares/ensureDataValidation';

const usersRouter = Router();
const userController = new UsersController();

usersRouter.get('/:id?', userController.list);
usersRouter.post('/', ensureDataValidation, userController.create);
usersRouter.put('/:id', ensureAuthenticated, userController.update);
usersRouter.delete('/:id', ensureAuthenticated, userController.delete);

export default usersRouter;
