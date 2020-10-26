import FakeHashProvider from '../../../providers/HashUser/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../../../repositories/fakes/FakeUsersRepository';
import AppError from '../../../../../shared/errors/AppError';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const hashPassword = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      hashPassword,
    );
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    });
    expect(user).toEqual(expect.objectContaining(user));
  });

  it('should not be able to create a new user with the same email of an another user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const hashPassword = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      hashPassword,
    );
    await createUserService.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
