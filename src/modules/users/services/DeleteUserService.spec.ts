import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import DeleteUserService from './DeleteUserService';
import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../providers/HashUser/fakes/FakeHashProvider';

describe('DeleteUser', () => {
  it('should be able to delete a user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const hashedPassword = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      hashedPassword,
    );

    const userData = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: 965689,
      cpf: 963454212,
      address: '10 Downing Street',
    });

    const deleteUser = new DeleteUserService(fakeUserRepository);

    expect(
      await deleteUser.execute({
        id: userData.id,
      }),
    ).toBe(undefined);
  });

  it("should not be able to delete a user that doesn't exist", async () => {
    const fakeUserRepository = new FakeUsersRepository();

    const deleteUser = new DeleteUserService(fakeUserRepository);

    expect(
      deleteUser.execute({
        id: undefined,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
