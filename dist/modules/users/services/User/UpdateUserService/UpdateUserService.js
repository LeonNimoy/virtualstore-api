"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _IUsersProvider = _interopRequireDefault(require("../../../providers/IUsersProvider"));

var _IHashUser = _interopRequireDefault(require("../../../providers/HashUser/models/IHashUser"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

var _UserDataValidatorProvider = _interopRequireDefault(require("../../../providers/Validations/UserDataValidatorProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashUser')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersProvider.default === "undefined" ? Object : _IUsersProvider.default, typeof _IHashUser.default === "undefined" ? Object : _IHashUser.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateUserService {
  constructor(userRepository, hashUser) {
    this.userRepository = userRepository;
    this.hashUser = hashUser;
  }

  async execute(userNewData) {
    const user = await this.userRepository.findById(userNewData.id);

    switch (user) {
      case null:
        throw new _AppError.default('Cadastro não encontrado', 404);

      case undefined:
        throw new _AppError.default('Cadastro não encontrado', 400);

      default:
    }

    const userDataValidator = new _UserDataValidatorProvider.default();

    if (userNewData.name) {
      user.name = userNewData.name;
    }

    if (userNewData.email) {
      const checkEmailFormat = await userDataValidator.validateEmail(userNewData.email);
      if (!checkEmailFormat) throw new _AppError.default('Email inválido');
      user.email = userNewData.email;
    }

    if (userNewData.password) {
      const checkPasswordFormat = await userDataValidator.validatePassword(userNewData.password);
      if (!checkPasswordFormat) throw new _AppError.default('A senha deve ter no mínimo 6 caracteres');
      const hashedPassword = await this.hashUser.generateHash(userNewData.password);
      user.password = hashedPassword;
    }

    if (userNewData.phone) {
      const checkPhoneFormat = await userDataValidator.validatePhone(userNewData.phone);
      if (!checkPhoneFormat) throw new _AppError.default('Telefone inválido');
      user.phone = userNewData.phone;
    }

    if (userNewData.cpf) {
      const checkCpfFormat = await userDataValidator.validateCpf(userNewData.cpf);
      if (!checkCpfFormat) throw new _AppError.default('CPF inválido');
      user.cpf = userNewData.cpf;
    }

    const userUpdated = await this.userRepository.update(user);

    switch (userUpdated) {
      case null:
        throw new _AppError.default('Cadastro não atualizado', 404);

      default:
    }

    return userUpdated;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = UpdateUserService;
exports.default = _default;