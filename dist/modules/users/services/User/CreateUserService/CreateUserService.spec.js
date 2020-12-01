"use strict";

var _FakeHashProvider = _interopRequireDefault(require("../../../providers/HashUser/fakes/FakeHashProvider"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _FakeUsersRepository = _interopRequireDefault(require("../../../repositories/fakes/FakeUsersRepository"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashPassword;
let createUser;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashPassword = new _FakeHashProvider.default();
    createUser = new _CreateUserService.default(fakeUsersRepository, fakeHashPassword);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: '33994567890',
      cpf: '387.189.725-60'
    });
    expect(user).toEqual(expect.objectContaining(user));
  });
  it('should not be able to create a new user with the same email of an another user', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: '33994567890',
      cpf: '387.189.725-60'
    });
    expect(createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: '33994567890',
      cpf: '387.189.725-60'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create a new user with an invalid email', async () => {
    expect(createUser.execute({
      name: 'John Doe',
      email: 'john@',
      password: '123456',
      phone: '33994567890',
      cpf: '387.189.725-60'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create a new user with a password that have less then 6 characters', async () => {
    expect(createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '12345',
      phone: '33994567890',
      cpf: '387.189.725-60'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create a new user with a phone that has an invalid format', async () => {
    expect(createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '12345',
      phone: '00994567890',
      cpf: '387.189.725-60'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create a new user with a cpf that has an invalid format', async () => {
    expect(createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '12345',
      phone: '33994567890',
      cpf: '38718972560'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});