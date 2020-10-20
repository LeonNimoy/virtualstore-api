import UpdateUserService from './UpdateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../providers/HashUser/fakes/FakeHashProvider';

describe('UpdateUser', () => {
  it('should be able to update a user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const hashPassword = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      hashPassword,
    );

    const oldUserData = await createUserService.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: 965689,
      cpf: 963454212,
      address: '10 Downing Street',
    });

    const updateUser = new UpdateUserService(fakeUserRepository, hashPassword);

    const userUpdated = await updateUser.execute({
      id: oldUserData.id,
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: 965689,
      cpf: 963454212,
      address: '10 Downing Street',
    });

    expect(userUpdated).toEqual(expect.objectContaining(userUpdated));
  });

  it("should not be able to update a user that doesn't exist", async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const hashPassword = new FakeHashProvider();

    const updateUser = new UpdateUserService(fakeUserRepository, hashPassword);

    expect(
      updateUser.execute({
        id: undefined,
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '123456',
        phone: 965689,
        cpf: 963454212,
        address: '10 Downing Street',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able o change the property name, if the input is empty', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const hashPassword = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      hashPassword,
    );
    const oldUserData = await createUserService.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: 965689,
      cpf: 963454212,
      address: '10 Downing Street',
    });

    const updateUser = new UpdateUserService(fakeUserRepository, hashPassword);

    const userUpdated = await updateUser.execute({
      id: oldUserData.id,
      name: '',
      email: 'john@gmail.com',
      password: '123456',
      phone: 965689,
      cpf: 963454212,
      address: '10 Downing Street',
    });

    expect(userUpdated.name).toEqual('John Doe');
  });

  it('should not be able o change the property password, if the input is empty', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const hashPassword = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      hashPassword,
    );
    const oldUserData = await createUserService.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: 965689,
      cpf: 963454212,
      address: '10 Downing Street',
    });

    const updateUser = new UpdateUserService(fakeUserRepository, hashPassword);

    const userUpdated = await updateUser.execute({
      id: oldUserData.id,
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '',
      phone: 965689,
      cpf: 963454212,
      address: '10 Downing Street',
    });

    expect(userUpdated.password).toEqual('123456');
  });

  it('should not be able o change the property phone, if the input is empty', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const hashPassword = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      hashPassword,
    );
    const oldUserData = await createUserService.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: 965689,
      cpf: 963454212,
      address: '10 Downing Street',
    });

    const updateUser = new UpdateUserService(fakeUserRepository, hashPassword);

    const userUpdated = await updateUser.execute({
      id: oldUserData.id,
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: 0,
      cpf: 963454212,
      address: '10 Downing Street',
    });

    expect(userUpdated.phone).toEqual(965689);
  });

  it('should not be able o change the property cpf, if the input is empty', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const hashPassword = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      hashPassword,
    );

    const oldUserData = await createUserService.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: 965689,
      cpf: 963454212,
      address: '10 Downing Street',
    });

    const updateUser = new UpdateUserService(fakeUserRepository, hashPassword);

    const userUpdated = await updateUser.execute({
      id: oldUserData.id,
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: 965689,
      cpf: 0,
      address: '10 Downing Street',
    });

    expect(userUpdated.cpf).toEqual(963454212);
  });

  it('should not be able o change the property address, if the input is empty', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const hashPassword = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      hashPassword,
    );
    const oldUserData = await createUserService.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: 965689,
      cpf: 963454212,
      address: '10 Downing Street',
    });

    const updateUser = new UpdateUserService(fakeUserRepository, hashPassword);

    const userUpdated = await updateUser.execute({
      id: oldUserData.id,
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: 965689,
      cpf: 963454212,
      address: '',
    });

    expect(userUpdated.address).toEqual('10 Downing Street');
  });
});
