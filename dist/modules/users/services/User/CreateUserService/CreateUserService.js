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

let CreateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashUser')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersProvider.default === "undefined" ? Object : _IUsersProvider.default, typeof _IHashUser.default === "undefined" ? Object : _IHashUser.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateUserService {
  constructor(userRepository, hashUser) {
    this.userRepository = userRepository;
    this.hashUser = hashUser;
  }

  async execute({
    name,
    email,
    password,
    phone,
    cpf
  }) {
    const userDataValidator = new _UserDataValidatorProvider.default();
    const checkEmailFormat = await userDataValidator.validateEmail(email);
    if (!checkEmailFormat) throw new _AppError.default('Email inválido');
    const checkPasswordFormat = await userDataValidator.validatePassword(password);
    if (!checkPasswordFormat) throw new _AppError.default('A senha deve ter no mínimo 6 caracteres');
    const checkCpfFormat = await userDataValidator.validateCpf(cpf);
    if (!checkCpfFormat) throw new _AppError.default('CPF inválido');
    const checkPhoneFormat = await userDataValidator.validatePhone(phone);
    if (!checkPhoneFormat) throw new _AppError.default('Telefone inválido');
    const checkEmailExistence = await this.userRepository.checkEmail(email);

    if (checkEmailExistence) {
      const hashedPassword = await this.hashUser.generateHash(password);
      const user = await this.userRepository.save({
        name,
        email,
        phone,
        cpf,
        password: hashedPassword
      });
      return user;
    }

    throw new _AppError.default('Já existe uma conta com este email. Por favor, informar outro email', 409);
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreateUserService;
exports.default = _default;