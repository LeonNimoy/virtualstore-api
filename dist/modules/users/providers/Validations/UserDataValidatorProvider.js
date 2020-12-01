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
    const cpfValidator = new RegExp(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
    const checkCpfFormat = cpfValidator.test(cpf);
    return checkCpfFormat;
  }

  async validatePhone(phone) {
    const phoneValidator = new RegExp(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/);
    const checkPhoneFormat = phoneValidator.test(phone);
    return checkPhoneFormat;
  }

}

exports.default = UserDataValidatorProvider;