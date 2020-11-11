"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IProductsProvider = _interopRequireDefault(require("../providers/IProductsProvider"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateProductService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IProductsProvider.default === "undefined" ? Object : _IProductsProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(productNewData) {
    const product = await this.productRepository.findById(productNewData.id);

    switch (product) {
      case null:
        throw new _AppError.default('Produto não encontrado', 404);

      case undefined:
        throw new _AppError.default('Produto não encontrado', 404);

      default:
    }

    if (productNewData.name) {
      product.name = productNewData.name;
    }

    if (productNewData.tags === undefined) {
      product.tags;
    } else if (productNewData.tags.length) {
      product.tags = productNewData.tags;
    }

    if (productNewData.description) {
      product.description = productNewData.description;
    }

    if (productNewData.image) {
      product.image = productNewData.image;
    }

    if (productNewData.price) {
      const priceFormatted = Number(productNewData.price.toFixed(2));
      product.price = priceFormatted;
    }

    if (productNewData.quantity) {
      product.quantity = productNewData.quantity;
    }

    const productUpdated = await this.productRepository.update(product);

    switch (productUpdated) {
      case null:
        throw new _AppError.default('Produto não foi identificado', 400);

      default:
    }

    return productUpdated;
  }

}) || _class) || _class) || _class) || _class);
var _default = UpdateProductService;
exports.default = _default;