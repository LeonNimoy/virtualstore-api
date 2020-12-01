"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _crypto = _interopRequireDefault(require("crypto"));

var _CreateGuestCartService = _interopRequireDefault(require("../services/GuestCart/CreateGuestCartService"));

var _UpdateGuestCartService = _interopRequireDefault(require("../services/GuestCart/UpdateGuestCartService"));

var _GuestCartsRepository = _interopRequireDefault(require("../repositories/GuestCartsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppError from '@shared/errors/AppError';
class GuestsCartsController {
  async list(req, res) {
    const {
      guest_token
    } = req.query;
    const guestCartRepository = new _GuestCartsRepository.default();
    const guestTokenStringified = String(guest_token);
    let userToken;
    guest_token ? userToken = await guestCartRepository.findGuestCartByGuestToken(guestTokenStringified) : userToken = _crypto.default.randomBytes(16).toString('hex');
    return res.status(200).json(userToken);
  }

  async create(req, res) {
    const {
      guest_Token
    } = req.body;

    const createGuestCart = _tsyringe.container.resolve(_CreateGuestCartService.default);

    const guestCart = await createGuestCart.execute(guest_Token);
    return res.status(200).json(guestCart);
  }

  async update(req, res) {
    const {
      id
    } = req.params;
    const {
      products
    } = req.body;

    const updateGuestCart = _tsyringe.container.resolve(_UpdateGuestCartService.default);

    const guestCartUpdated = await updateGuestCart.execute({
      products,
      guestToken: id
    });
    return res.status(200).json(guestCartUpdated);
  }

}

exports.default = GuestsCartsController;