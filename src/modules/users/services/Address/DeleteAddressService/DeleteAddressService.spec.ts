import CreateAddressService from '../CreateAddressService/CreateAddressService';
import FakeAddressesRepository from '../../../repositories/fakes/FakeAddressesRepository';
import DeleteAddressService from './DeleteAddressService';
import AppError from '../../../../../shared/errors/AppError';
import FakeHashProvider from '../../../providers/HashUser/fakes/FakeHashProvider';
import FakeUsersRepository from '../../../repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../User/CreateUserService/CreateUserService';

let fakeAddressesRepository: FakeAddressesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let createAddressService: CreateAddressService;
let deleteAddressService: DeleteAddressService;

describe('DeleteProduct', () => {
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

    deleteAddressService = new DeleteAddressService(fakeAddressesRepository);
  });

  it('should be able to delete an address', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: '33994567890',
      cpf: '387.189.725-60',
    });

    const addressCreated = await createAddressService.execute({
      id: user.id,
      cep: '34810786',
      address: 'foo street',
      address_number: 123,
      address_complement: 'Some complement',
      neighborhood: 'baa',
      city: 'Some City',
      state: 'Some State',
    });

    expect(
      await deleteAddressService.execute({
        address_id: addressCreated.id,
      }),
    ).toBe(undefined);
  });

  it("should not be able to delete an address that doesn't exist", async () => {
    expect(
      deleteAddressService.execute({
        address_id: undefined,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
