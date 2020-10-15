"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var BCryptHashUser_1 = __importDefault(require("./HashUser/implementations/BCryptHashUser"));
tsyringe_1.container.registerSingleton('HashUser', BCryptHashUser_1.default);
