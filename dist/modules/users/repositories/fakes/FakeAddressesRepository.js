"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AddressSchema = require("../../infra/databases/mongoose/schemas/AddressSchema");

class FakeAddressesRepository {
  constructor() {
    this.addresses = [];
  }

  async findAllAddresses(user_id) {
    const userId = this.addresses.find(address => address.id === user_id);
    return userId;
  }

  async findAddressById(address_id) {
    const addressFound = this.addresses.find(address => address_id === address.id);
    return addressFound;
  }

  async saveAddress(addressData) {
    const address = new _AddressSchema.AddressSchema(addressData);
    Object.assign(address, addressData);
    this.addresses.push(address);
    return address;
  }

  async updateUserAddress(newAddressData) {
    if (this.addresses.map(address => newAddressData.address_id === address.id)) {
      this.addresses.map(address => newAddressData === address);
    }

    return Object.assign(newAddressData);
  }

  async deleteUserAddress(addressId) {
    const address = this.addresses.map(addressCreated => addressId === addressCreated.id);

    if (address) {
      this.addresses.splice(0, 1);
    }
  }

  async deleteAllUserAddresses(userID) {
    const address = this.addresses.map(addressCreated => userID === addressCreated.user_id);

    if (address) {
      this.addresses.splice(0, 1);
    }
  }

}

var _default = FakeAddressesRepository;
exports.default = _default;