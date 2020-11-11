"use strict";

var _CreateAddressService = _interopRequireDefault(require("../CreateAddressService/CreateAddressService"));

var _FakeAddressesRepository = _interopRequireDefault(require("../../../repositories/fakes/FakeAddressesRepository"));

var _DeleteAddressService = _interopRequireDefault(require("./DeleteAddressService"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../../../providers/HashUser/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../../../repositories/fakes/FakeUsersRepository"));

var _CreateUserService = _interopRequireDefault(require("../../User/CreateUserService/CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAddressesRepository;
let fakeUsersRepository;
let fakeHashProvider;
let createUserService;
let createAddressService;
let deleteAddressService;
describe('DeleteProduct', () => {
  beforeEach(() => {
    fakeAddressesRepository = new _FakeAddressesRepository.default();
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createUserService = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider);
    createAddressService = new _CreateAddressService.default(fakeUsersRepository, fakeAddressesRepository);
    deleteAddressService = new _DeleteAddressService.default(fakeAddressesRepository);
  });
  it('should be able to delete an address', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    });
    const addressCreated = await createAddressService.execute({
      id: user.id,
      cep: '34810786',
      address: 'foo street',
      address_complement: 'number 123',
      neighborhood: 'baa',
      city: 'Some City',
      state: 'Some State'
    });
    expect(await deleteAddressService.execute({
      address_id: addressCreated.id
    })).toBe(undefined);
  });
  it("should not be able to delete an address that doesn't exist", async () => {
    expect(deleteAddressService.execute({
      address_id: undefined
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});