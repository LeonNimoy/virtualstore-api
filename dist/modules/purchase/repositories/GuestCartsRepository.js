"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GuestCartSchema = _interopRequireDefault(require("../infra/databases/mongoose/schemas/GuestCartSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GuestCartsRepository {
  async findGuestCartByGuestToken(guestToken) {
    const guestCart = await _GuestCartSchema.default.findOne({
      guestToken
    });
    return guestCart;
  }

  async createAGuestGuestCart(guestToken) {
    const newGuestCart = new _GuestCartSchema.default({
      guestToken
    });
    const guestCartCreated = await newGuestCart.save();
    return guestCartCreated;
  }

  async updateGuestGuestCartProducts(newProductsData) {
    const guestCartUpdated = await _GuestCartSchema.default.findOneAndUpdate({
      guestToken: newProductsData.guestToken
    }, {
      $set: newProductsData
    }, {
      new: true
    });
    return guestCartUpdated;
  }

  async deleteGuestGuestCart(guestToken) {
    await _GuestCartSchema.default.findOneAndDelete({
      guestToken
    });
  }

}

exports.default = GuestCartsRepository;