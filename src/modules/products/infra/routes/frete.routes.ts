import { Router } from 'express';

import FreteController from '../../controllers/FreteController';

const fretesRouter = Router();
const freteController = new FreteController();

fretesRouter.get('/', freteController.search);

export default fretesRouter;
