"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ProfilesController_1 = __importDefault(require("../../controllers/ProfilesController"));
var profilesRouter = express_1.Router();
var profilesController = new ProfilesController_1.default();
profilesRouter.post('/:id', profilesController.post);
exports.default = profilesRouter;
