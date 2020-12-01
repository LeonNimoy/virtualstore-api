"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../../../repositories/fakes/FakeUsersRepository"));

var _CreateUserService = _interopRequireDefault(require("../CreateUserService/CreateUserService"));

var _DeleteUserService = _interopRequireDefault(require("./DeleteUserService"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../../../providers/HashUser/fakes/FakeHashProvider"));

var _FakeAddressesRepository = _interopRequireDefault(require("../../../repositories/fakes/FakeAddressesRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DeleteUser', () => {
  it('should be able to delete a user', async () => {
    const fakeUserRepository = new _FakeUsersRepository.default();
    const hashedPassword = new _FakeHashProvider.default();
    const fakeAddressRepository = new _FakeAddressesRepository.default();
    const createUser = new _CreateUserService.default(fakeUserRepository, hashedPassword);
    const userData = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: '33994567890',
      cpf: '387.189.725-60'
    });
    const deleteUser = new _DeleteUserService.default(fakeUserRepository, fakeAddressRepository);
    expect(await deleteUser.execute({
      id: userData.id
    })).toBe(undefined);
  });
  it("should not be able to delete a user that doesn't exist", async () => {
    const fakeUserRepository = new _FakeUsersRepository.default();
    const fakeAddressRepository = new _FakeAddressesRepository.default();
    const deleteUser = new _DeleteUserService.default(fakeUserRepository, fakeAddressRepository);
    expect(deleteUser.execute({
      id: undefined
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});