"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateCheckoutService = _interopRequireDefault(require("../services/CreateCheckoutService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CheckoutsController {
  async store(req, res) {
    const {
      id
    } = req.params;
    const {
      cardHash,
      purchaseAmount,
      addressId,
      productId
    } = req.body;

    const createCheckout = _tsyringe.container.resolve(_CreateCheckoutService.default);

    await createCheckout.execute({
      customerId: id,
      cardHash,
      productId,
      purchaseAmount,
      addressId
    });
    return res.status(200).json({
      message: 'Compra realizada com sucesso'
    });
  }

}

exports.default = CheckoutsController;