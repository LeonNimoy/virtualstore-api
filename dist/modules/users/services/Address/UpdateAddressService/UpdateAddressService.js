"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _IAddressesProvider = _interopRequireDefault(require("../../../providers/IAddressesProvider"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateAddressService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AddressesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAddressesProvider.default === "undefined" ? Object : _IAddressesProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateAddressService {
  constructor(addressesRepository) {
    this.addressesRepository = addressesRepository;
  }

  async execute(addressNewData) {
    await this.addressesRepository.updateUserAddress(addressNewData);
  }

}) || _class) || _class) || _class) || _class);
var _default = UpdateAddressService;
exports.default = _default;