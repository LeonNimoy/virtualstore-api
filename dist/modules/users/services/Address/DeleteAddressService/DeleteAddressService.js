"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IAddressesProvider = _interopRequireDefault(require("../../../providers/IAddressesProvider"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteAddressService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AddressesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAddressesProvider.default === "undefined" ? Object : _IAddressesProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DeleteAddressService {
  constructor(addressRepository) {
    this.addressRepository = addressRepository;
  }

  async execute({
    address_id
  }) {
    const addressFound = await this.addressRepository.findAddressById(address_id);

    switch (addressFound) {
      case null:
        throw new _AppError.default('Endereço não encontrado', 404);

      case undefined:
        throw new _AppError.default('Endereço não identificado', 404);

      default:
    }

    await this.addressRepository.deleteUserAddress(addressFound.id);
  }

}) || _class) || _class) || _class) || _class);
var _default = DeleteAddressService;
exports.default = _default;