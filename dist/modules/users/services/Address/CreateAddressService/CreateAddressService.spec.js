"use strict";

var _CreateAddressService = _interopRequireDefault(require("./CreateAddressService"));

var _FakeHashProvider = _interopRequireDefault(require("../../../providers/HashUser/fakes/FakeHashProvider"));

var _CreateUserService = _interopRequireDefault(require("../../User/CreateUserService/CreateUserService"));

var _FakeAddressesRepository = _interopRequireDefault(require("../../../repositories/fakes/FakeAddressesRepository"));

var _FakeUsersRepository = _interopRequireDefault(require("../../../repositories/fakes/FakeUsersRepository"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAddressesRepository;
let fakeUsersRepository;
let fakeHashProvider;
let createUserService;
let createAddressService;
describe('CreateProduct', () => {
  beforeEach(() => {
    fakeAddressesRepository = new _FakeAddressesRepository.default();
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createUserService = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider);
    createAddressService = new _CreateAddressService.default(fakeUsersRepository, fakeAddressesRepository);
  });
  it('should be able to create a new address for an user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    });
    const createAddressForAnUser = await createAddressService.execute({
      id: user.id,
      cep: '34810786',
      address: 'foo street',
      address_number: 123,
      address_complement: 'Some complement',
      neighborhood: 'baa',
      city: 'Some City',
      state: 'Some State'
    });
    expect(createAddressForAnUser).toEqual(Object.assign(createAddressForAnUser));
  });
  it('should not be able to create a new address for an invalid user', async () => {
    expect(createAddressService.execute({
      id: undefined,
      cep: '34810786',
      address: 'foo street',
      address_number: 123,
      address_complement: 'Some complement',
      neighborhood: 'baa',
      city: 'Some City',
      state: 'Some State'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});