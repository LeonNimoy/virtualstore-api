"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _IGuestCartProvider = _interopRequireDefault(require("../../providers/IGuestCartProvider"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateGuestCartService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('GuestCartsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IGuestCartProvider.default === "undefined" ? Object : _IGuestCartProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateGuestCartService {
  constructor(guestCartRepository) {
    this.guestCartRepository = guestCartRepository;
  }

  async execute(guestToken) {
    const guestCartCreated = await this.guestCartRepository.createAGuestGuestCart(guestToken);
    return guestCartCreated;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreateGuestCartService;
exports.default = _default;