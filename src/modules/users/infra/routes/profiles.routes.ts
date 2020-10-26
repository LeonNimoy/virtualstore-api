import { Router } from 'express';

import ProfilesController from '../../controllers/ProfilesController';

const profilesRouter = Router();
const profilesController = new ProfilesController();

profilesRouter.post('/:id', profilesController.post);

export default profilesRouter;
