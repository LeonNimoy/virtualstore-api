"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AddressesController_1 = __importDefault(require("../../controllers/AddressesController"));
var ensureAuthenticated_1 = __importDefault(require("../../middlewares/ensureAuthenticated"));
var addressesRouter = express_1.Router();
var addressesController = new AddressesController_1.default();
addressesRouter.get('/', ensureAuthenticated_1.default, addressesController.list);
addressesRouter.post('/', ensureAuthenticated_1.default, addressesController.create);
addressesRouter.put('/', ensureAuthenticated_1.default, addressesController.update);
addressesRouter.delete('/', ensureAuthenticated_1.default, addressesController.delete);
exports.default = addressesRouter;
