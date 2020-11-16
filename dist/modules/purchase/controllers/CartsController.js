"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateCartService = _interopRequireDefault(require("../services/Cart/UpdateCartService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CartsController {
  async update(req, res) {
    const {
      id
    } = req.params;

    const updateCart = _tsyringe.container.resolve(_UpdateCartService.default);

    await updateCart.execute({
      user_id: id,
      products: [req.body]
    });
    return res.status(200).json({
      message: 'Carrinho atualizado'
    });
  }

}

exports.default = CartsController;