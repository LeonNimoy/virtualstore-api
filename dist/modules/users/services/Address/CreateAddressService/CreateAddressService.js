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

var _IUsersProvider = _interopRequireDefault(require("../../../providers/IUsersProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateAddressService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('AddressesRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersProvider.default === "undefined" ? Object : _IUsersProvider.default, typeof _IAddressesProvider.default === "undefined" ? Object : _IAddressesProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateAddressService {
  constructor(userRepository, addressesRepository) {
    this.userRepository = userRepository;
    this.addressesRepository = addressesRepository;
  }

  async execute({
    id,
    cep,
    address,
    address_complement,
    address_number,
    neighborhood,
    city,
    state
  }) {
    const findAValidUser = await this.userRepository.findById(id);

    switch (findAValidUser) {
      case null:
        throw new _AppError.default('Cadastro não identificado', 404);

      case undefined:
        throw new _AppError.default('Cadastro não encontrado', 400);

      default:
    }

    const addressDataValidator = new _AddressDataValidatorProvider.default();
    const checkAddressNumberFormat = await addressDataValidator.validateAddressNumber(address_number);
    if (!checkAddressNumberFormat) throw new _AppError.default('Número de endereço inválido');
    const checkCepFormat = await addressDataValidator.validateCep(cep);
    if (!checkCepFormat) throw new _AppError.default('Cep de endereço inválido');
    const addressCreated = await this.addressesRepository.saveAddress({
      id,
      cep,
      address,
      address_complement,
      address_number,
      neighborhood,
      city,
      state
    });
    return addressCreated;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreateAddressService;
exports.default = _default;