import { Router } from 'express';

import AddressesController from '../../controllers/AddressesController';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

const addressesRouter = Router();
const addressesController = new AddressesController();

addressesRouter.get('/', ensureAuthenticated, addressesController.list);
addressesRouter.post('/', ensureAuthenticated, addressesController.create);
addressesRouter.put('/', ensureAuthenticated, addressesController.update);
addressesRouter.delete('/', ensureAuthenticated, addressesController.delete);

export default addressesRouter;
