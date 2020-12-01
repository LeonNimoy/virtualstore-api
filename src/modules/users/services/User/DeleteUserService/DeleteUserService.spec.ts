import FakeUsersRepository from '../../../repositories/fakes/FakeUsersRepository';
import CreateUserService from '../CreateUserService/CreateUserService';
import DeleteUserService from './DeleteUserService';
import AppError from '../../../../../shared/errors/AppError';
import FakeHashProvider from '../../../providers/HashUser/fakes/FakeHashProvider';
import FakeAddressesRepository from '../../../repositories/fakes/FakeAddressesRepository';

describe('DeleteUser', () => {
  it('should be able to delete a user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const hashedPassword = new FakeHashProvider();
    const fakeAddressRepository = new FakeAddressesRepository();

    const createUser = new CreateUserService(
      fakeUserRepository,
      hashedPassword,
    );

    const userData = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: '33994567890',
      cpf: '387.189.725-60',
    });

    const deleteUser = new DeleteUserService(
      fakeUserRepository,
      fakeAddressRepository,
    );

    expect(
      await deleteUser.execute({
        id: userData.id,
      }),
    ).toBe(undefined);
  });

  it("should not be able to delete a user that doesn't exist", async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeAddressRepository = new FakeAddressesRepository();

    const deleteUser = new DeleteUserService(
      fakeUserRepository,
      fakeAddressRepository,
    );

    expect(
      deleteUser.execute({
        id: undefined,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
