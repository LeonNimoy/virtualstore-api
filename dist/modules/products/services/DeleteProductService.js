"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IProductsProvider = _interopRequireDefault(require("../providers/IProductsProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteProductService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IProductsProvider.default === "undefined" ? Object : _IProductsProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DeleteProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute({
    id
  }) {
    const product = await this.productRepository.findById(id);

    switch (product) {
      case null:
        throw new _AppError.default('Produto não encontrado', 404);

      case undefined:
        throw new _AppError.default('Produto não identificado', 404);

      default:
    } // const fileUploaded = new DiskStorageProvider();
    // await fileUploaded.deleteFile(product.image);


    await this.productRepository.delete(product);
  }

}) || _class) || _class) || _class) || _class);
var _default = DeleteProductService;
exports.default = _default;