import CreateAddressService from './CreateAddressService';
import FakeHashProvider from '../../../providers/HashUser/fakes/FakeHashProvider';
import CreateUserService from '../../User/CreateUserService/CreateUserService';
import FakeAddressesRepository from '../../../repositories/fakes/FakeAddressesRepository';
import FakeUsersRepository from '../../../repositories/fakes/FakeUsersRepository';
import AppError from '../../../../../shared/errors/AppError';

let fakeAddressesRepository: FakeAddressesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let createAddressService: CreateAddressService;

describe('CreateProduct', () => {
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
  });

  it('should be able to create a new address for an user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    });

    const createAddressForAnUser = await createAddressService.execute({
      id: user.id,
      cep: '34810786',
      address: 'foo street',
      address_number: 123,
      address_complement: 'Some complement',
      neighborhood: 'baa',
      city: 'Some City',
      state: 'Some State',
    });
    expect(createAddressForAnUser).toEqual(
      Object.assign(createAddressForAnUser),
    );
  });

  it('should not be able to create a new address for an invalid user', async () => {
    expect(
      createAddressService.execute({
        id: undefined,
        cep: '34810786',
        address: 'foo street',
        address_number: 123,
        address_complement: 'Some complement',
        neighborhood: 'baa',
        city: 'Some City',
        state: 'Some State',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
