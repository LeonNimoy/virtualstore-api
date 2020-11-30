"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _IUsersProvider = _interopRequireDefault(require("../../../users/providers/IUsersProvider"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _ITransactionProvider = _interopRequireDefault(require("../../providers/ITransactionProvider"));

var _ICartProvider = _interopRequireDefault(require("../../providers/ICartProvider"));

var _IProductsProvider = _interopRequireDefault(require("../../../products/providers/IProductsProvider"));

var _IPaymentProvider = _interopRequireDefault(require("../../providers/PaymentProvider/entities/IPaymentProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateCheckoutService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PagarmeProvider')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('TransactionsRepository')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('CartsRepository')(target, undefined, 3);
}, _dec6 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 4);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof _IPaymentProvider.default === "undefined" ? Object : _IPaymentProvider.default, typeof _IUsersProvider.default === "undefined" ? Object : _IUsersProvider.default, typeof _ITransactionProvider.default === "undefined" ? Object : _ITransactionProvider.default, typeof _ICartProvider.default === "undefined" ? Object : _ICartProvider.default, typeof _IProductsProvider.default === "undefined" ? Object : _IProductsProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = class CreateCheckoutService {
  constructor(pagarmeProvider, userRepository, transactionRepository, cartRepository, productRepository) {
    this.pagarmeProvider = pagarmeProvider;
    this.userRepository = userRepository;
    this.transactionRepository = transactionRepository;
    this.cartRepository = cartRepository;
    this.productRepository = productRepository;
  }

  async execute({
    payment_method,
    amount,
    payment_token,
    customer_id
  }) {
    if (!customer_id) throw new _AppError.default('Usuário não identificado');
    const userData = await this.userRepository.findById(customer_id);

    switch (userData) {
      case null:
        throw new _AppError.default('Usuário não identificado para realizar a compra', 404);

      case undefined:
        throw new _AppError.default('Usuário inválido para realizar a compra', 400);

      default:
    }

    if (amount === undefined) throw new _AppError.default('Valor da compra inválido');
    if (amount <= 0) throw new _AppError.default('Valor da compra inválido', 403);
    const checkoutCreated = await this.pagarmeProvider.createTransaction({
      amount,
      payment_method,
      payment_token
    });
    if (!checkoutCreated) throw new _AppError.default('Não foi possível concluir a sua compra. Divergência nos dados enviados.');
    const transactionCreated = await this.transactionRepository.saveTransaction(checkoutCreated);

    if (transactionCreated) {
      const userCart = await this.cartRepository.findCartByUserId(customer_id);

      switch (userCart) {
        case null:
          throw new _AppError.default('Produtos inválidos para o registro no estoque');

        default:
          userCart.products.map(product => this.productRepository.decreaseProductQuantity(product.id, product.quantity));
      }

      await this.cartRepository.emptyUserCart(customer_id);
    }

    if (!transactionCreated) throw new _AppError.default('Compra não registrada');
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateCheckoutService;
exports.default = _default;