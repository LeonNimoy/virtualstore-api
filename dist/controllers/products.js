"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@overnightjs/core");
const mongoose_1 = __importDefault(require("mongoose"));
const Product_1 = require("../models/Product");
let ProductsController = class ProductsController {
    async getProducts(_, resp) {
        try {
            const products = await Product_1.Product.find({});
            resp.status(200).json(products);
        }
        catch (error) {
            resp.status(500).json({ error: 'Something went wrong' });
        }
    }
    async getProduct(req, resp) {
        try {
            Product_1.Product.findById(req.params.id, (err, product) => {
                if (err) {
                    throw new Error('Product not found!');
                }
                else {
                    resp.status(200).json(product);
                }
            });
        }
        catch (error) {
            resp.status(500).json({ error: 'Something went wrong' });
        }
    }
    async createProduct(req, resp) {
        try {
            const product = new Product_1.Product(req.body);
            const result = await product.save();
            resp.status(201).json(result);
        }
        catch (error) {
            if (error instanceof mongoose_1.default.Error.ValidationError) {
                resp.status(422).json({ error: error.message });
            }
            else {
                resp.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }
    async updateProduct(req, resp) {
        try {
            Product_1.Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            }).exec((err, product) => {
                if (err) {
                    throw new Error('Product not found!');
                }
                else {
                    resp.status(201).json(product);
                }
            });
        }
        catch (err) {
            resp.status(400).json({ error: err.message });
        }
    }
    async deleteProduct(req, resp) {
        try {
            const { id } = req.params;
            const product = await Product_1.Product.findByIdAndRemove(id);
            if (!product) {
                throw new Error('Product not found!');
            }
            resp.status(200).json({ message: 'Product deleted!' });
        }
        catch (err) {
            resp.status(400).json({ error: err.message });
        }
    }
};
__decorate([
    core_1.Get(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProducts", null);
__decorate([
    core_1.Get(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProduct", null);
__decorate([
    core_1.Post(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
__decorate([
    core_1.Put(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    core_1.Delete(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProduct", null);
ProductsController = __decorate([
    core_1.Controller('products')
], ProductsController);
exports.default = ProductsController;
//# sourceMappingURL=products.js.map