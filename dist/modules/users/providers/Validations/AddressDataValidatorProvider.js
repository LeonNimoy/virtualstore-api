"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class AddressDataValidatorProvider {
  async validateAddressNumber(address_number) {
    const addressNumberValidator = new RegExp(/^[0-9]{1,10}$/);
    const checkAddressNumberFormat = addressNumberValidator.test(String(address_number));
    return checkAddressNumberFormat;
  }

  async validateCep(cep) {
    const cepValidator = new RegExp(/^[0-9]{8,8}$/);
    const checkCepFormat = cepValidator.test(cep);
    return checkCepFormat;
  }

}

exports.default = AddressDataValidatorProvider;