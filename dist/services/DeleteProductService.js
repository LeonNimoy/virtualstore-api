"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../models/Product");
class DeleteProductService {
    async execute({ id }) {
        const product = await Product_1.Product.findById(id);
        if (!product) {
            throw new Error('Product not Found');
        }
        await product.remove();
        return product;
    }
}
exports.default = DeleteProductService;
//# sourceMappingURL=DeleteProductService.js.map