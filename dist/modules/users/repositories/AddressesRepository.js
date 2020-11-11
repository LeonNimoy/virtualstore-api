"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _dateFnsTz = require("date-fns-tz");

var _AddressSchema = require("../infra/databases/mongoose/schemas/AddressSchema");

class AddressesRepository {
  async findAllAddresses(user_id) {
    const userAddresses = await _AddressSchema.AddressSchema.find({
      user_id
    });
    return userAddresses;
  }

  async findAddressById(id) {
    const userId = await _AddressSchema.AddressSchema.findById(id);
    return userId;
  }

  async saveAddress({
    cep,
    address,
    address_complement,
    neighborhood,
    city,
    state,
    id
  }) {
    const newDate = new Date();
    const timeZone = 'America/Sao_Paulo';
    const dateWithTimeZone = (0, _dateFnsTz.utcToZonedTime)(newDate, timeZone);
    const createUserAddress = new _AddressSchema.AddressSchema({
      cep,
      address,
      address_complement,
      neighborhood,
      city,
      state,
      user_id: id,
      created_at: (0, _dateFns.format)(dateWithTimeZone, "dd/MM/yyyy '-' HH'h'mm'm'ss's'")
    });
    const addressCreated = await createUserAddress.save();
    return addressCreated;
  }

  async updateUserAddress(addressNewData) {
    const newDate = new Date();
    const timeZone = 'America/Sao_Paulo';
    const dateWithTimeZone = (0, _dateFnsTz.utcToZonedTime)(newDate, timeZone);
    await _AddressSchema.AddressSchema.findByIdAndUpdate(addressNewData.address_id, {
      $set: addressNewData,
      updated_at: (0, _dateFns.format)(dateWithTimeZone, "dd/MM/yyyy '-' HH'h'mm'm'ss's'")
    });
  }

  async deleteUserAddress(userAddressId) {
    await _AddressSchema.AddressSchema.findByIdAndDelete(userAddressId);
  }

  async deleteAllUserAddresses(userId) {
    await _AddressSchema.AddressSchema.deleteMany({
      user_id: userId
    });
  }

}

exports.default = AddressesRepository;