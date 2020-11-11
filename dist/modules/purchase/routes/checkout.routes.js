"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CheckoutsController_1 = __importDefault(require("../controllers/CheckoutsController"));
var ensureAuthenticated_1 = __importDefault(require("../../users/middlewares/ensureAuthenticated"));
var checkoutsRouter = express_1.Router();
var checkoutsController = new CheckoutsController_1.default();
checkoutsRouter.post('/', ensureAuthenticated_1.default, checkoutsController.store);
exports.default = checkoutsRouter;
