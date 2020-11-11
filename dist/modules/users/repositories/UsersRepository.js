"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _dateFnsTz = require("date-fns-tz");

var _UserSchema = require("../infra/databases/mongoose/schemas/UserSchema");

class UsersRepository {
  async find() {
    const users = await _UserSchema.UserSchema.find().select('-password');
    return users;
  }

  async findById(id) {
    const userId = await _UserSchema.UserSchema.findById(id).select('-password');
    return userId;
  }

  async checkEmail(newUserEmail) {
    const notAvailableEmail = await _UserSchema.UserSchema.findOne({
      email: newUserEmail
    });

    if (!notAvailableEmail) {
      return true;
    }

    return false;
  }

  async findByEmail(userEmail) {
    const findUser = await _UserSchema.UserSchema.findOne({
      email: userEmail
    });
    return findUser;
  }

  async save({
    email,
    name,
    password
  }) {
    const newDate = new Date();
    const timeZone = 'America/Sao_Paulo';
    const dateWithTimeZone = (0, _dateFnsTz.utcToZonedTime)(newDate, timeZone);
    const userCreated = new _UserSchema.UserSchema({
      email,
      name,
      password,
      created_at: (0, _dateFns.format)(dateWithTimeZone, "dd/MM/yyyy '-' HH'h'mm'm'ss's'")
    });
    await userCreated.save();
    return userCreated.id;
  }

  async update({
    email,
    name,
    password,
    cpf,
    id,
    phone
  }) {
    const newDate = new Date();
    const timeZone = 'America/Sao_Paulo';
    const dateWithTimeZone = (0, _dateFnsTz.utcToZonedTime)(newDate, timeZone);
    const userUpdated = await _UserSchema.UserSchema.findByIdAndUpdate(id, {
      phone,
      email,
      name,
      password,
      cpf,
      updated_at: (0, _dateFns.format)(dateWithTimeZone, "dd/MM/yyyy '-' HH'h'mm'm'ss's'")
    }, {
      new: true
    }).select('-password');
    return userUpdated;
  }

  async delete(user) {
    await _UserSchema.UserSchema.deleteOne(user);
  }

}

exports.default = UsersRepository;