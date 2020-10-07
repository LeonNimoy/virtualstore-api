import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const userController = new UsersController();

usersRouter.get('/:id?', userController.list);
usersRouter.post('/', userController.create);

export default usersRouter;
