"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _IProductsProvider = _interopRequireDefault(require("../../products/providers/IProductsProvider"));

var _IAddressesProvider = _interopRequireDefault(require("../../users/providers/IAddressesProvider"));

var _IUsersProvider = _interopRequireDefault(require("../../users/providers/IUsersProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IPaymentProvider = _interopRequireDefault(require("../providers/PaymentProvider/entities/IPaymentProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateCheckoutService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PagarmeProvider')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('AddressesRepository')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IPaymentProvider.default === "undefined" ? Object : _IPaymentProvider.default, typeof _IUsersProvider.default === "undefined" ? Object : _IUsersProvider.default, typeof _IAddressesProvider.default === "undefined" ? Object : _IAddressesProvider.default, typeof _IProductsProvider.default === "undefined" ? Object : _IProductsProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class CreateCheckoutService {
  constructor(pagarmeProvider, userRepository, addressRepository, productRepository) {
    this.pagarmeProvider = pagarmeProvider;
    this.userRepository = userRepository;
    this.addressRepository = addressRepository;
    this.productRepository = productRepository;
  }

  async execute({
    addressId,
    purchaseAmount,
    cardHash,
    customerId,
    productId
  }) {
    const userData = await this.userRepository.findById(customerId);

    switch (userData) {
      case null:
        throw new _AppError.default('Usuário não identificado para realizar a compra', 404);

      case undefined:
        throw new _AppError.default('Usuário inválido para realizar a compra', 400);

      default:
    }

    const addressData = await this.addressRepository.findAddressById(addressId);

    switch (addressData) {
      case null:
        throw new _AppError.default('Endereço não identificado para realizar a compra', 404);

      case undefined:
        throw new _AppError.default('Endereço inválido para realizar a compra', 400);

      default:
    }

    const productData = await this.productRepository.findById(productId);

    switch (productData) {
      case null:
        throw new _AppError.default('Produto não identificado para realizar a compra', 404);

      case undefined:
        throw new _AppError.default('Produto inválido para realizar a compra', 400);

      default:
    }

    if (purchaseAmount === undefined) throw new _AppError.default('Valor da compra inválido', 400);
    if (purchaseAmount <= 0) throw new _AppError.default('Valor da compra inválido', 403);
    await this.pagarmeProvider.createTransaction({
      amount: purchaseAmount * 100,
      cardHash,
      userData,
      addressData,
      productData
    });
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateCheckoutService;
exports.default = _default;