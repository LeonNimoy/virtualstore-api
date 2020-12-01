import UpdateUserService from './UpdateUserService';
import FakeUsersRepository from '../../../repositories/fakes/FakeUsersRepository';
import CreateUserService from '../CreateUserService/CreateUserService';
import AppError from '../../../../../shared/errors/AppError';
import FakeHashProvider from '../../../providers/HashUser/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashPassword: FakeHashProvider;
let createUser: CreateUserService;
let updateUser: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeHashPassword = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashPassword);

    updateUser = new UpdateUserService(fakeUsersRepository, fakeHashPassword);
  });

  it('should be able to update a user', async () => {
    const oldUserData = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: '33994567890',
      cpf: '387.189.725-60',
    });

    const userUpdated = await updateUser.execute({
      id: oldUserData.id,
      name: 'John Doe1',
      email: 'john1@gmail.com',
      password: '123456',
      phone: '11994567890',
      cpf: '335.189.725-60',
    });

    expect(userUpdated).toEqual(expect.objectContaining(userUpdated));
  });

  it("should not be able to update a user that doesn't exist", async () => {
    expect(
      updateUser.execute({
        id: undefined,
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '123456',
        phone: '33994567890',
        cpf: '387.189.725-60',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able o change the property name, if the input is empty', async () => {
    const oldUserData = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: '33994567890',
      cpf: '387.189.725-60',
    });

    const userUpdated = await updateUser.execute({
      id: oldUserData.id,
      name: '',
      email: 'john@gmail.com',
      password: '123456',
      phone: '33994567890',
      cpf: '387.189.725-60',
    });

    expect(userUpdated.name).toEqual('John Doe');
  });

  it('should not be able o change the property password, if the input is empty', async () => {
    const oldUserData = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: '33994567890',
      cpf: '387.189.725-60',
    });

    const userUpdated = await updateUser.execute({
      id: oldUserData.id,
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '',
      phone: '33994567890',
      cpf: '387.189.725-60',
    });

    expect(userUpdated.password).toEqual('123456');
  });

  it('should not be able o change the property email, if the input have an invalid format', async () => {
    const oldUserData = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: '33994567890',
      cpf: '387.189.725-60',
    });

    expect(
      updateUser.execute({
        id: oldUserData.id,
        name: 'John Doe',
        email: 'john@',
        password: '123456',
        phone: '33994567890',
        cpf: '387.189.725-60',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able o change the property password, if the input have an invalid format', async () => {
    const oldUserData = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: '33994567890',
      cpf: '387.189.725-60',
    });

    expect(
      updateUser.execute({
        id: oldUserData.id,
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '12345',
        phone: '33994567890',
        cpf: '387.189.725-60',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able o change the property cpf, if the input has an invalid format', async () => {
    const oldUserData = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: '33994567890',
      cpf: '387.189.725-60',
    });

    expect(
      updateUser.execute({
        id: oldUserData.id,
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '123123',
        phone: '33994567890',
        cpf: '123123123544444444',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able o change the property phone, if the input has an invalid format', async () => {
    const oldUserData = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: '33994567890',
      cpf: '387.189.725-60',
    });

    expect(
      updateUser.execute({
        id: oldUserData.id,
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '123456',
        phone: '00994567890',
        cpf: '387.189.725-60',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
