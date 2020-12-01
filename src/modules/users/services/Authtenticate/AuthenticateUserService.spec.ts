import FakeHashProvider from '../../providers/HashUser/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from '../User/CreateUserService/CreateUserService';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import AppError from '../../../../shared/errors/AppError';

describe('AuthenticateUser', () => {
  it('should be able to authenticate a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const hashPassword = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUserRepository, hashPassword);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: '33994567890',
      cpf: '387.189.725-60',
    });

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      hashPassword,
    );
    const response = await authenticateUser.execute({
      email: 'john@gmail.com',
      password: '123456',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with a non existing user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const hashPassword = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      hashPassword,
    );

    expect(
      authenticateUser.execute({
        email: 'john@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const hashPassword = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUserRepository, hashPassword);

    await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: '33994567890',
      cpf: '387.189.725-60',
    });

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      hashPassword,
    );

    expect(
      authenticateUser.execute({
        email: 'john@gmail.com',
        password: 'wrong password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
