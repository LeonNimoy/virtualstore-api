"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _auth = _interopRequireDefault(require("../../../../config/auth"));

var _IHashUser = _interopRequireDefault(require("../../providers/HashUser/models/IHashUser"));

var _UsersRepository = _interopRequireDefault(require("../../repositories/UsersRepository"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthenticateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashUser')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _UsersRepository.default === "undefined" ? Object : _UsersRepository.default, typeof _IHashUser.default === "undefined" ? Object : _IHashUser.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class AuthenticateUserService {
  constructor(userRepository, hashUser) {
    this.userRepository = userRepository;
    this.hashUser = hashUser;
  }

  async execute({
    email,
    password
  }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new _AppError.default('Email ou Senha inválido', 401);
    }

    const passwordMatched = await this.hashUser.compareHash(password, user.password);

    if (!passwordMatched) {
      throw new _AppError.default('Email ou Senha inválido', 401);
    }

    const {
      secret,
      expiresIn
    } = _auth.default.jwt;
    const token = (0, _jsonwebtoken.sign)({}, secret, {
      subject: user.id,
      expiresIn
    });
    return {
      user,
      token
    };
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = AuthenticateUserService;
exports.default = _default;