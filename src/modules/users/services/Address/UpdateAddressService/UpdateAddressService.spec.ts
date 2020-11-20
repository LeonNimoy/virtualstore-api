import UpdateAddressService from './UpdateAddressService';
import FakeHashProvider from '../../../providers/HashUser/fakes/FakeHashProvider';
import FakeAddressesRepository from '../../../repositories/fakes/FakeAddressesRepository';
import CreateAddressService from '../CreateAddressService/CreateAddressService';
import FakeUsersRepository from '../../../repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../User/CreateUserService/CreateUserService';

let fakeAddressesRepository: FakeAddressesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let createAddressService: CreateAddressService;
let updateAddressService: UpdateAddressService;

describe('UpdateProduct', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    createAddressService = new CreateAddressService(
      fakeUsersRepository,
      fakeAddressesRepository,
    );

    updateAddressService = new UpdateAddressService(fakeAddressesRepository);
  });

  it('should be able to update an address', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    });

    await createAddressService.execute({
      id: user.id,
      address_id: '12345A',
      cep: '34810786',
      address: 'foo street',
      address_number: 123,
      address_complement: 'Some complement',
      neighborhood: 'baa',
      city: 'Some City',
      state: 'Some State',
    });

    const addressNewData = updateAddressService.execute({
      address_id: '12345A',
      cep: '34810786',
      address: 'foo1 street',
      address_number: 123,
      address_complement: 'Some complement',
      neighborhood: 'baa',
      city: 'Some City',
      state: 'Some State',
    });

    expect(addressNewData).toEqual(expect.objectContaining(addressNewData));
  });
});
