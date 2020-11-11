"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserSchema = require("../../infra/databases/mongoose/schemas/UserSchema");

class FakeUsersRepository {
  constructor() {
    this.users = [];
  }

  async find() {
    const users = await _UserSchema.UserSchema.find();
    return users;
  }

  async findById(id) {
    const userId = this.users.find(user => user.id === id);
    return userId;
  }

  async checkEmail(newUserEmail) {
    const notAvailableEmail = this.users.find(user => user.email === newUserEmail);

    if (!notAvailableEmail) {
      return true;
    }

    return false;
  }

  async findByEmail(userEmail) {
    const findUser = this.users.find(user => user.email === userEmail);
    return findUser;
  }

  async save(userData) {
    const user = new _UserSchema.UserSchema(userData);
    Object.assign(user, userData);
    this.users.push(user);
    return user;
  }

  async update(newUserData) {
    if (this.users.find(element => element.id === newUserData.id)) {
      this.users.map(user => newUserData === user);
    }

    return Object.assign(newUserData);
  }

  async delete(userToDelete) {
    const findUser = this.users.map(user => userToDelete.id === user.id);

    if (findUser) {
      this.users.splice(0, 1);
    }
  }

}

var _default = FakeUsersRepository;
exports.default = _default;