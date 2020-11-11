"use strict";

var _UpdateAddressService = _interopRequireDefault(require("./UpdateAddressService"));

var _FakeHashProvider = _interopRequireDefault(require("../../../providers/HashUser/fakes/FakeHashProvider"));

var _FakeAddressesRepository = _interopRequireDefault(require("../../../repositories/fakes/FakeAddressesRepository"));

var _CreateAddressService = _interopRequireDefault(require("../CreateAddressService/CreateAddressService"));

var _FakeUsersRepository = _interopRequireDefault(require("../../../repositories/fakes/FakeUsersRepository"));

var _CreateUserService = _interopRequireDefault(require("../../User/CreateUserService/CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAddressesRepository;
let fakeUsersRepository;
let fakeHashProvider;
let createUserService;
let createAddressService;
let updateAddressService;
describe('UpdateProduct', () => {
  beforeEach(() => {
    fakeAddressesRepository = new _FakeAddressesRepository.default();
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createUserService = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider);
    createAddressService = new _CreateAddressService.default(fakeUsersRepository, fakeAddressesRepository);
    updateAddressService = new _UpdateAddressService.default(fakeAddressesRepository);
  });
  it('should be able to update an address', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    });
    await createAddressService.execute({
      id: user.id,
      address_id: '12345A',
      cep: '34810786',
      address: 'foo street',
      address_complement: 'number 123',
      neighborhood: 'baa',
      city: 'Some City',
      state: 'Some State'
    });
    const addressNewData = updateAddressService.execute({
      address_id: '12345A',
      cep: '34810786',
      address: 'foo1 street',
      address_complement: 'number 123',
      neighborhood: 'baa',
      city: 'Some City',
      state: 'Some State'
    });
    expect(addressNewData).toEqual(expect.objectContaining(addressNewData));
  });
});