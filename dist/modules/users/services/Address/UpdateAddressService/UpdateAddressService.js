"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _AddressDataValidatorProvider = _interopRequireDefault(require("../../../providers/Validations/AddressDataValidatorProvider"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

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
    const addressDataValidator = new _AddressDataValidatorProvider.default();
    const checkAddressNumberFormat = await addressDataValidator.validateAddressNumber(addressNewData.address_number);
    if (!checkAddressNumberFormat) throw new _AppError.default('Número de endereço inválido');
    const checkCepFormat = await addressDataValidator.validateCep(addressNewData.cep);
    if (!checkCepFormat) throw new _AppError.default('Cep de endereço inválido');
    await this.addressesRepository.updateUserAddress(addressNewData);
  }

}) || _class) || _class) || _class) || _class);
var _default = UpdateAddressService;
exports.default = _default;