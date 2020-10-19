import FakeHashProvider from '../providers/HashUser/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('AuthenticateUser', () => {
  it.skip('should be able to authenticate a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const hashPassword = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUserRepository, hashPassword);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      phone: 965689,
      cpf: 963454212,
      address: '10 Downing Street',
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
});
