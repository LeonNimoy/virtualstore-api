"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _UpdateCartService = _interopRequireDefault(require("../services/Cart/UpdateCartService"));

var _CartsRepository = _interopRequireDefault(require("../repositories/CartsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CartsController {
  async list(req, res) {
    const {
      id
    } = req.params;
    const findUserCart = new _CartsRepository.default();
    const userCartFound = await findUserCart.findCartByUserId(id);

    switch (userCartFound) {
      case undefined:
        throw new _AppError.default('Não foi possível localizar o seu carrinho', 400);

      default:
        return res.status(200).json(userCartFound);
    }
  }

  async update(req, res) {
    const {
      id
    } = req.params;
    const {
      products
    } = req.body;

    const updateCart = _tsyringe.container.resolve(_UpdateCartService.default);

    await updateCart.execute({
      user_id: id,
      products
    });
    return res.status(200).json({
      message: 'Carrinho atualizado'
    });
  }

}

exports.default = CartsController;