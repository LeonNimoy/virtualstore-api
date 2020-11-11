"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateAddressService = _interopRequireDefault(require("../services/Address/CreateAddressService/CreateAddressService"));

var _UpdateAddressService = _interopRequireDefault(require("../services/Address/UpdateAddressService/UpdateAddressService"));

var _DeleteAddressService = _interopRequireDefault(require("../services/Address/DeleteAddressService/DeleteAddressService"));

var _AddressesRepository = _interopRequireDefault(require("../repositories/AddressesRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AddressesController {
  async list(req, res) {
    const {
      id
    } = req.params;
    const addresses = new _AddressesRepository.default();
    const addressFound = await addresses.findAllAddresses(id);
    return res.status(200).json(addressFound);
  }

  async create(req, res) {
    const {
      id
    } = req.params;
    const {
      cep,
      address,
      address_complement,
      neighborhood,
      city,
      state
    } = req.body;

    const createUserAddress = _tsyringe.container.resolve(_CreateAddressService.default);

    await createUserAddress.execute({
      id,
      cep,
      address,
      address_complement,
      neighborhood,
      city,
      state
    });
    return res.status(200).json({
      message: 'Endereço criado!'
    });
  }

  async update(req, res) {
    const updateAddress = _tsyringe.container.resolve(_UpdateAddressService.default);

    await updateAddress.execute(req.body);
    return res.status(200).json({
      message: 'Endereço atualizado!'
    });
  }

  async delete(req, res) {
    const {
      address_id
    } = req.body;

    const addressDeleted = _tsyringe.container.resolve(_DeleteAddressService.default);

    await addressDeleted.execute({
      address_id
    });
    return res.status(200).json({
      message: 'Endereço excluído!'
    });
  }

}

exports.default = AddressesController;