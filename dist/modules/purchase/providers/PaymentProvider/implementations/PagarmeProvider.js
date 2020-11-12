"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pagarme = _interopRequireDefault(require("pagarme"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PagarmeProvider {
  async createTransaction({
    amount,
    cardHash,
    userData,
    addressData,
    productData
  }) {
    const client = await _pagarme.default.client.connect({
      api_key: process.env.PAGARME_API_KEY
    });
    if (amount === undefined) throw new _AppError.default('Valor inválido para transação', 400);
    if (userData === undefined) throw new _AppError.default('Usuário inválido para transação', 400);
    if (addressData === undefined) throw new _AppError.default('Endereço inválido para transação', 400);
    if (productData === undefined) throw new _AppError.default('Produto inválido para transação', 400);
    await client.transactions.create({
      amount,
      card_hash: cardHash,
      customer: {
        external_id: userData.id,
        name: userData.name,
        type: 'individual',
        country: 'br',
        email: userData.email,
        documents: [{
          type: 'cpf',
          number: String(userData.cpf)
        }],
        phone_numbers: [`+5531${userData.phone}`],
        birthday: '2000-07-23'
      },
      billing: {
        name: userData.name,
        address: {
          country: 'br',
          state: addressData.state,
          city: addressData.city,
          neighborhood: addressData.neighborhood,
          street: addressData.address,
          complementary: addressData.address_complement,
          zipcode: addressData.cep
        }
      },
      shipping: {
        name: userData.name,
        fee: 1000,
        delivery_date: '2000-12-21',
        expedited: true,
        address: {
          country: 'br',
          state: addressData.state,
          city: addressData.city,
          neighborhood: addressData.neighborhood,
          street: addressData.address,
          complementary: addressData.address_complement,
          zipcode: addressData.cep
        }
      },
      items: [{
        id: productData.id,
        title: productData.name,
        unit_price: 10000,
        quantity: 1,
        tangible: true
      }, {
        id: 'b123',
        title: 'Blue pill',
        unit_price: 10000,
        quantity: 1,
        tangible: true
      }]
    });
  }

}

var _default = PagarmeProvider;
exports.default = _default;