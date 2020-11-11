"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// import { container } from 'tsyringe';
// import CreateCheckoutService from '../services/CreateCheckoutService';
class CheckoutsController {
  async store(req, res) {
    // const { id } = req.params;
    // const { cardHash, amount, addressId, productsId } = req.body;
    // const createCheckout = container.resolve(CreateCheckoutService);
    // await createCheckout.execute({
    //   customerId: id,
    //   cardHash,
    //   productsId,
    //   amount,
    //   addressId,
    // });
    return res.status(200).json({
      message: 'Compra realizada com sucesso'
    });
  }

}

exports.default = CheckoutsController;