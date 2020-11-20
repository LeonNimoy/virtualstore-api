"use strict";

var _UpdateUserService = _interopRequireDefault(require("./UpdateUserService"));

var _FakeUsersRepository = _interopRequireDefault(require("../../../repositories/fakes/FakeUsersRepository"));

var _CreateUserService = _interopRequireDefault(require("../CreateUserService/CreateUserService"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../../../providers/HashUser/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashPassword;
let createUser;
let updateUser;
describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashPassword = new _FakeHashProvider.default();
    createUser = new _CreateUserService.default(fakeUsersRepository, fakeHashPassword);
    updateUser = new _UpdateUserService.default(fakeUsersRepository, fakeHashPassword);
  });
  it('should be able to update a user', async () => {
    const oldUserData = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    });
    const userUpdated = await updateUser.execute({
      id: oldUserData.id,
      name: 'John Doe1',
      email: 'john1@gmail.com',
      password: '123456',
      phone: 1134354676,
      cpf: 23423434576
    });
    expect(userUpdated).toEqual(expect.objectContaining(userUpdated));
  });
  it("should not be able to update a user that doesn't exist", async () => {
    expect(updateUser.execute({
      id: undefined,
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able o change the property name, if the input is empty', async () => {
    const oldUserData = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    });
    const userUpdated = await updateUser.execute({
      id: oldUserData.id,
      name: '',
      email: 'john@gmail.com',
      password: '123456'
    });
    expect(userUpdated.name).toEqual('John Doe');
  });
  it('should not be able o change the property password, if the input is empty', async () => {
    const oldUserData = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    });
    const userUpdated = await updateUser.execute({
      id: oldUserData.id,
      name: 'John Doe',
      email: 'john@gmail.com',
      password: ''
    });
    expect(userUpdated.password).toEqual('123456');
  });
  it('should not be able o change the property email, if the input have an invalid format', async () => {
    const oldUserData = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    });
    expect(updateUser.execute({
      id: oldUserData.id,
      name: 'John Doe',
      email: 'john@',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able o change the property password, if the input have an invalid format', async () => {
    const oldUserData = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    });
    expect(updateUser.execute({
      id: oldUserData.id,
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '12345'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able o change the property cpf, if the input have an invalid format', async () => {
    const oldUserData = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    });
    expect(updateUser.execute({
      id: oldUserData.id,
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123123',
      cpf: 1231231235
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able o change the property phone, if the input is empty', async () => {
    const oldUserData = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    });
    const userUpdated = await updateUser.execute({
      id: oldUserData.id,
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: 0
    });
    expect(userUpdated.phone).toEqual(undefined);
  });
});