"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_routes_1 = __importDefault(require("./products.routes"));
const routes = express_1.Router();
routes.use('/products', products_routes_1.default);
routes.use('/', async (req, res) => {
    try {
        res.status(200).send('API is working!!');
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});
exports.default = routes;
//# sourceMappingURL=index.routes.js.map