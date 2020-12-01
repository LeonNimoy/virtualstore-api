"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _IGuestCartProvider = _interopRequireDefault(require("../../providers/IGuestCartProvider"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateGuestCartService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('GuestCartsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IGuestCartProvider.default === "undefined" ? Object : _IGuestCartProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateGuestCartService {
  constructor(guestCartRepository) {
    this.guestCartRepository = guestCartRepository;
  }

  async execute(guestCartNewData) {
    const guestCartUpdated = await this.guestCartRepository.updateGuestGuestCartProducts(guestCartNewData);

    switch (guestCartUpdated) {
      case null:
        throw new _AppError.default('Não foi possível atualizar o carrinho', 404);

      default:
        return guestCartUpdated;
    }
  }

}) || _class) || _class) || _class) || _class);
var _default = UpdateGuestCartService;
exports.default = _default;