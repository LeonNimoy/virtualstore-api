"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UsersController_1 = __importDefault(require("../../controllers/UsersController"));
var ensureAuthenticated_1 = __importDefault(require("../../middlewares/ensureAuthenticated"));
var ensureDataCompleteness_1 = __importDefault(require("../../middlewares/ensureDataCompleteness"));
var usersRouter = express_1.Router();
var userController = new UsersController_1.default();
usersRouter.get('/:id?', userController.list);
usersRouter.post('/', ensureDataCompleteness_1.default, userController.create);
usersRouter.put('/', ensureAuthenticated_1.default, userController.update);
usersRouter.delete('/', ensureAuthenticated_1.default, userController.delete);
exports.default = usersRouter;
