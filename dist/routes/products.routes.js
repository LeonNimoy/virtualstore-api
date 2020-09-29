"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const CreateProductService_1 = __importDefault(require("../services/CreateProductService"));
const UpdateProductService_1 = __importDefault(require("../services/UpdateProductService"));
const DeleteProductService_1 = __importDefault(require("../services/DeleteProductService"));
const Product_1 = require("../models/Product");
const productsRouter = express_1.Router();
productsRouter.get('/', async (req, res) => {
    try {
        const products = await Product_1.Product.find({});
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});
productsRouter.get('/:id', async (req, res) => {
    try {
        Product_1.Product.findById(req.params.id, (err, product) => {
            if (err) {
                throw new Error('Product not found!');
            }
            else {
                res.status(200).json(product);
            }
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});
productsRouter.post('/', async (req, res) => {
    const { name, tags, description, image, price, quantity } = req.body;
    try {
        const createProduct = new CreateProductService_1.default();
        const product = await createProduct.execute({
            name,
            tags,
            description,
            image,
            price,
            quantity,
        });
        return res.status(201).json(product);
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            return res.status(422).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
productsRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, tags, description, image, price, quantity } = req.body;
        const updateProduct = new UpdateProductService_1.default();
        const product = await updateProduct.execute({
            id,
            name,
            tags,
            description,
            image,
            price,
            quantity,
        });
        res.status(204).json(product);
    }
    catch (err) {
        if (err instanceof mongoose_1.default.Error.ValidationError) {
            res.status(422).json({ err: err.message });
        }
        else {
            res.status(500).json({ err: 'Internal Server Error' });
        }
    }
});
productsRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateProduct = new DeleteProductService_1.default();
        await updateProduct.execute({
            id,
        });
        res.status(200).json({ message: 'Product deleted!' });
    }
    catch (err) {
        if (err instanceof mongoose_1.default.Error.ValidationError) {
            res.status(422).json({ err: err.message });
        }
        else {
            res.status(500).json({ err: 'Internal Server Error' });
        }
    }
});
exports.default = productsRouter;
//# sourceMappingURL=products.routes.js.map