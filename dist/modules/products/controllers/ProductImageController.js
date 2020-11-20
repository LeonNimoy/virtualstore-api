"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateProductImageService = _interopRequireDefault(require("../services/UpdateProductImageService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductImageController {
  async update(req, res) {
    const updateProductImage = _tsyringe.container.resolve(_UpdateProductImageService.default);

    const productImage = await updateProductImage.execute({
      imageFilename: req.file.filename
    });
    return res.status(201).json(productImage);
  }

}

exports.default = ProductImageController;