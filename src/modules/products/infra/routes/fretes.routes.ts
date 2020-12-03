import { Router } from 'express';

import FretesController from '../../controllers/FretesController';

const fretesRouter = Router();
const fretesController = new FretesController();

fretesRouter.get('/', fretesController.search);

export default fretesRouter;
