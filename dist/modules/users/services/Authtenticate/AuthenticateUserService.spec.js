"use strict";

var _FakeHashProvider = _interopRequireDefault(require("../../providers/HashUser/fakes/FakeHashProvider"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

var _CreateUserService = _interopRequireDefault(require("../User/CreateUserService/CreateUserService"));

var _FakeUsersRepository = _interopRequireDefault(require("../../repositories/fakes/FakeUsersRepository"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('AuthenticateUser', () => {
  it('should be able to authenticate a new user', async () => {
    const fakeUserRepository = new _FakeUsersRepository.default();
    const hashPassword = new _FakeHashProvider.default();
    const createUser = new _CreateUserService.default(fakeUserRepository, hashPassword);
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: '33994567890',
      cpf: '387.189.725-60'
    });
    const authenticateUser = new _AuthenticateUserService.default(fakeUserRepository, hashPassword);
    const response = await authenticateUser.execute({
      email: 'john@gmail.com',
      password: '123456'
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be able to authenticate with a non existing user', async () => {
    const fakeUserRepository = new _FakeUsersRepository.default();
    const hashPassword = new _FakeHashProvider.default();
    const authenticateUser = new _AuthenticateUserService.default(fakeUserRepository, hashPassword);
    expect(authenticateUser.execute({
      email: 'john@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new _FakeUsersRepository.default();
    const hashPassword = new _FakeHashProvider.default();
    const createUser = new _CreateUserService.default(fakeUserRepository, hashPassword);
    await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: '33994567890',
      cpf: '387.189.725-60'
    });
    const authenticateUser = new _AuthenticateUserService.default(fakeUserRepository, hashPassword);
    expect(authenticateUser.execute({
      email: 'john@gmail.com',
      password: 'wrong password'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});