"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../models/Product");
class CreateProductService {
    async execute({ id, name, tags, description, image, price, quantity, }) {
        const product = await Product_1.Product.findById(id);
        if (!product) {
            throw new Error('Product not Found');
        }
        if (name) {
            product.name = name;
        }
        if (tags) {
            product.tags = tags;
        }
        if (description) {
            product.description = description;
        }
        if (image) {
            product.image = image;
        }
        if (price) {
            product.price = price;
        }
        if (quantity) {
            product.quantity = quantity;
        }
        await product.save();
        return product;
    }
}
exports.default = CreateProductService;
//# sourceMappingURL=UpdateProductService.js.map