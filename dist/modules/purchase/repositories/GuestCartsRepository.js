"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _dateFnsTz = require("date-fns-tz");

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
    const newDate = new Date();
    const timeZone = 'America/Sao_Paulo';
    const dateWithTimeZone = (0, _dateFnsTz.utcToZonedTime)(newDate, timeZone);
    const newGuestCart = new _GuestCartSchema.default({
      guestToken,
      created_at: (0, _dateFns.format)(dateWithTimeZone, "dd/MM/yyyy '-' HH'h'mm'm'ss's'")
    });
    const guestCartCreated = await newGuestCart.save();
    return guestCartCreated;
  }

  async updateGuestGuestCartProducts(newProductsData) {
    const newDate = new Date();
    const timeZone = 'America/Sao_Paulo';
    const dateWithTimeZone = (0, _dateFnsTz.utcToZonedTime)(newDate, timeZone);
    const guestCartUpdated = await _GuestCartSchema.default.findOneAndUpdate({
      guestToken: newProductsData.guestToken
    }, {
      $set: newProductsData,
      updated_at: (0, _dateFns.format)(dateWithTimeZone, "dd/MM/yyyy '-' HH'h'mm'm'ss's'")
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