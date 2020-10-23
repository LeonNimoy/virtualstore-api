"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
require("../../modules/users/providers");
var S3StorageProvider_1 = __importDefault(require("./providers/StorageProvider/implementations/S3StorageProvider"));
var ProductsRepository_1 = __importDefault(require("../../modules/products/repositories/ProductsRepository"));
var UsersRepository_1 = __importDefault(require("../../modules/users/repositories/UsersRepository"));
var ProfileRepository_1 = __importDefault(require("../../modules/users/repositories/ProfileRepository"));
tsyringe_1.container.registerSingleton('ProductsRepository', ProductsRepository_1.default);
tsyringe_1.container.registerSingleton('UsersRepository', UsersRepository_1.default);
tsyringe_1.container.registerSingleton('ProfileRepository', ProfileRepository_1.default);
tsyringe_1.container.registerSingleton('S3StorageProvider', S3StorageProvider_1.default);
