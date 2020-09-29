"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../models/Product");
class CreateProductService {
    async execute({ name, tags, description, image, price, quantity, }) {
        const product = new Product_1.Product({
            name,
            tags,
            description,
            image,
            price,
            quantity,
        });
        await product.save();
        return product;
    }
}
exports.default = CreateProductService;
//# sourceMappingURL=CreateProductService.js.map