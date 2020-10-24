import UpdateUserService from './UpdateUserService';
import FakeUsersRepository from '../../../repositories/fakes/FakeUsersRepository';
import CreateUserService from '../CreateUserService/CreateUserService';
import AppError from '../../../../../shared/errors/AppError';
import FakeHashProvider from '../../../providers/HashUser/fakes/FakeHashProvider';

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
    });

    const updateUser = new UpdateUserService(fakeUserRepository, hashPassword);

    const userUpdated = await updateUser.execute({
      id: oldUserData.id,
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
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
    });

    const updateUser = new UpdateUserService(fakeUserRepository, hashPassword);

    const userUpdated = await updateUser.execute({
      id: oldUserData.id,
      name: '',
      email: 'john@gmail.com',
      password: '123456',
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
    });

    const updateUser = new UpdateUserService(fakeUserRepository, hashPassword);

    const userUpdated = await updateUser.execute({
      id: oldUserData.id,
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '',
    });

    expect(userUpdated.password).toEqual('123456');
  });
});