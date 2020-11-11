"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _emailValidator = _interopRequireDefault(require("email-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserDataValidatorProvider {
  async validateEmail(email) {
    const checkEmailFormat = _emailValidator.default.validate(email);

    return checkEmailFormat;
  }

  async validatePassword(password) {
    const passwordValidator = new RegExp(/^.{6,}$/);
    const checkPasswordFormat = passwordValidator.test(password);
    return checkPasswordFormat;
  }

  async validateCpf(cpf) {
    const cpfValidator = new RegExp(/^.{11,11}$/);
    const stringifyCPF = cpf.toString();
    const checkCpfFormat = cpfValidator.test(stringifyCPF);
    return checkCpfFormat;
  }

}

exports.default = UserDataValidatorProvider;